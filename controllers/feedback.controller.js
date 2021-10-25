const db = require("../models");
const Op = db.Sequelize.Op;
const sequelize = db.Sequelize;
const Feedback = db.feedback;
const errorController = require("./error.controller");
var xssFilters = require('xss-filters');

// Hien thi trang quan tri Feedback trong admin
exports.showPage = (req, res) => {
    try{
        if(!req.roleAction || !req.roleAction.actview){
            return errorController.render403(req, res);
        }
        res.render("admin/feedback");
    }catch(err){
        return errorController.render500(req, res);
    }
}

// Ajax add feedback tu FontEnd
exports.Add = async(req, res) => {
    try {
        var valid = [];
        var name = (req.body.name) ? xssFilters.inHTMLData(req.body.name) : "",
            email = (req.body.email) ? xssFilters.inHTMLData(req.body.email) : "",
            link = (req.body.link) ? xssFilters.inHTMLData(req.body.link) : "",
            subject = (req.body.subject) ? xssFilters.inHTMLData(req.body.subject) : "",
            content = (req.body.content) ? xssFilters.inHTMLData(req.body.content) : "",
            //token = req.session.ajaxpagetoken || "token",
            //token2 = req.body.token || "token2",
            newToken = functions.shuffle();
        req.session.ajaxpagetoken = newToken;
        /* 
        // Yêu cầu token xác thực khi gửi - (Bỏ khi cache page)    
        if (token != token2) {
            res.status(401).json({ code: 0, message: "Unauthorized" });
            return;
        }
        // Yêu cầu login mới đc gửi
        var btnLoginHtml = `<div class="text-center"><a class="btn btnInLine" href="/login" rel="nofollow">${res.__("textLogin")}<a></div>`;
        if(!req.session.userid){
            return res.json({ code: 401, message: res.__("textRequireLogin"), button: btnLoginHtml });
        } */
        if (name == "")
            valid.push({ id: "name", error: "Vui lòng nhập Họ và Tên của bạn" });
        if (email == "")
            valid.push({ id: "email", error: "Vui lòng nhập email của bạn" });
        if (link == "")
            valid.push({ id: "link", error: "Vui lòng nhập đường dẫn bạn muốn báo cáo" });
        if (subject == "")
            valid.push({ id: "subject", error: "Vui lòng nhập tiêu đề" });
        if (content == "")
            valid.push({ id: "content", error: "Vui lòng nhập nội dung phản hồi" });
        if (valid.length > 0) {
            return res.json({ code: 0, message: "Lỗi, dữ liệu nhập chưa đúng", data: valid });
        }
        await Feedback.create({
            name: name,
            email: email,
            link: link,
            subject: subject,
            content: content,
            ipaddress: req.ipAddr || "",
            useragent: req.userAgent || ""
        }).then(() => {
            res.json({ code: 1, message: "Cảm ơn bạn đã gửi phản hồi này. Chúng tôi sẽ sớm xử lý.", token: newToken });
        }).catch(() => {
            res.json({ code: 0, message: "Lỗi, chưa gửi được", token: newToken });
        })
    } catch (err) {
        return errorController.render500Ajax(req, res);
    }
}

// Thuc hien bulk action
exports.Bulk = async(req, res) => {
    try {
        var ids = req.body.id;
        var action = req.body.action;
        switch (action) {
            case "delete":
                req.body.id = ids;
                this.Delete(req, res);
                break;
            default:
                return errorController.renderBulkErrorAjax(req, res);
        }
    } catch (err) {
        return errorController.render500Ajax(req, res);
    }
}

// Thay doi trang thai Feedback
exports.UpdateToggleColumn = async(req, res) => {
    try {
        if(!req.roleAction || !req.roleAction.actedit){
            return errorController.render403Ajax(req, res);
        }
        var id = req.params.id || req.body.id,
            value = req.body.value;
        value = (value) ? "finished" : "pending";
        var rsUpdate = await Feedback.update({ fbstatus: value }, { where: { id: id } });
        if (rsUpdate) {
            return errorController.renderEditSuccessAjax(req, res);
        } else {
            return errorController.renderEditErrorAjax(req, res);
        }
    } catch (err) {
        return errorController.render500Ajax(req, res);
    }
}

// implement delete Feedback
exports.Delete = async(req, res) => {
    try {
        if(!req.roleAction || !req.roleAction.actdel){
            return errorController.render403Ajax(req, res);
        }
        var id = req.params.id || req.body.id,
            rsDestroy = await Feedback.destroy({
                where: {
                    id: id
                }
            });
        if (rsDestroy <= 0) {
            return errorController.renderDelErrorAjax(req, res);
        }
        return errorController.renderDelSuccessAjax(req, res);
    } catch (err) {
        return errorController.render500Ajax(req, res);
    }
}

// load data for datatable
exports.Datatable = async(req, res) => {
    try {
        var where = {},
            search = req.query.columns[1].search.value,
            status = req.query.columns[2].search.value || "%",
            offset = Number(req.query.start) || 0,
            length = Number(req.query.length) || 10,
            sortColumn = "id",
            sortType = req.query.order[0].dir;
        sortColumn = (req.query.order[0].column == 1) ? "name" : sortColumn;
        sortColumn = (req.query.order[0].column == 2) ? "subject" : sortColumn;
        sortColumn = (req.query.order[0].column == 3) ? "content" : sortColumn;
        sortColumn = (req.query.order[0].column == 4) ? "createdAt" : sortColumn;
        if (search) {
            where = {
                [Op.or]: [{
                    name: {
                        [Op.like]: `%${search}%`
                    }
                }, {
                    email: {
                        [Op.like]: `%${search}%`
                    }
                }, {
                    link: {
                        [Op.like]: `%${search}%`
                    }
                }, {
                    subject: {
                        [Op.like]: `%${search}%`
                    }
                }, {
                    content: {
                        [Op.like]: `%${search}%`
                    }
                }]
            }
        }
        if (status != "%") {
            where.fbstatus = status;
        }
        var roleAction = (req.roleAction) ? req.roleAction : {};
        const fbs = await Feedback.findAndCountAll({
            where: where,
            order: [
                [sortColumn, sortType]
            ],
            attributes: {
                include:[
                    [sequelize.literal(`${(roleAction.actview)?roleAction.actview:0}`), 'roleview'],
                    [sequelize.literal(`${(roleAction.actadd)?roleAction.actadd:0}`), 'roleadd'],
                    [sequelize.literal(`${(roleAction.actedit)?roleAction.actedit:0}`), 'roleedit'],
                    [sequelize.literal(`${(roleAction.actdel)?roleAction.actdel:0}`), 'roledel'],
                    [sequelize.literal(`${req.session.userid}`), 'mine'],
                ]
            },
            offset: offset,
            limit: length
        });
        res.json({ aaData: fbs.rows, iTotalDisplayRecords: fbs.count, iTotalRecords: fbs.count });
    } catch (err) {
        return errorController.renderPaginationErrorAjax(req, res);
    }
}