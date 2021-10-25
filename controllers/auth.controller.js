const db = require("../models");
const config = require('config');
const serverConf = config.get("server");
const tracerConf = config.get("tracer");
const md5 = require("md5");
const Op = db.Sequelize.Op;
const User = db.user;
const AuthToken = db.auth;
const Role = db.role;
const Tracer = db.tracer;
const errorController = require("./error.controller");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var xssFilters = require('xss-filters');
var expiresIn = 60 * 60 * 24 * 365;

exports.signup = async(req, res) => {
    var username = xssFilters.inHTMLData(req.body.username) || "",
        nickname = xssFilters.inHTMLData(req.body.nickname) || username,
        email = xssFilters.inHTMLData(req.body.email) || "",
        password = xssFilters.inHTMLData(req.body.password) || "";
    password = bcrypt.hashSync(password, 8);
    await User.create({
        username: username,
        email: email,
        nickname: nickname,
        password: password,
        isactive: false,
        roleid: null
    }).then(user => {
        var activecode = user.id + new Date().toUTCString();
        activecode = md5(activecode);
        user.activecode = activecode;
        user.save();
        return res.send({ code: 1, message: "Đăng ký thành công"});
    }).catch(() => {
        return errorController.render500Ajax(req, res);
    });
}

exports.signin = async(req, res) => {
    try{
        var minDate = new Date();
        minDate.setMinutes(minDate.getMinutes() - tracerConf.blockerrlogintime);
        var count = await Tracer.count({
            where:{                
                object: "user",
                action: "login",
                createdAt: {
                    [Op.gte]: minDate
                }
            }
        })
        if(count >= tracerConf.maxerrloginnumber){
            return res.json({ code: 0, message: "Thử lại sau 5 phút do đăng nhập sai quá nhiều lần" });
        }
        const user = await User.findOne({
            where: {
                username: req.body.username
            },
            include:{
                model: Role,
                as: "role",
                attributes:['id', 'rolename', 'ismaster']
            }
        })
        var flagTrace = false,
            errObject = {};
        if (!user) {        
            await Tracer.create({
                ip: req.ipAddr,
                agent: req.userAgent,
                object: "user",
                action: "login",
                notes: "Đăng nhập sai"
            });
            return res.json({ code: 0, message: "Tên đăng nhập không tồn tại" });
        }

        if (user.isblock) {
            flagTrace = true;
            errObject = { code: 0, message: "Tài khoản đang bị khóa" };
        }

        if (!user.isactive) {
            flagTrace = true;
            errObject = { code: 0, message: "Tài khoản chưa kích hoạt"};
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            flagTrace = true;
            errObject = { code: 0, message: "Mật khẩu không đúng" };
        }

        if(flagTrace){
            await Tracer.create({
                ip: req.ipAddr,
                agent: req.userAgent,
                object: "user",
                action: "login",
                notes: "Đăng nhập sai"
            });
            return res.json(errObject);
        }

        var token = jwt.sign({ id: user.id }, serverConf.secret, {
            expiresIn: expiresIn
        });
        await AuthToken.update({
            isblock: true
        },{
            where:{
                username: user.username
            }
        })
        await AuthToken.create({
            token: token,
            username: user.username
        });
        
        req.session.token = token;
        req.session.userid = user.id;
        req.session.nickname = user.nickname;
        req.session.username = user.username;
        req.session.avatar = user.avatar;
        req.session.role = user.role;
        if(req.body.keeplogin && req.body.keeplogin == "on"){
            res.cookie('token', token, { maxAge: expiresIn, httpOnly: true });
        }
        return res.json({ code: 1, message: "Đăng nhập thành công", token: token });
    }catch(err){
        console.log(err)
        return errorController.render500Ajax(req, res);
    }
}