const db = require("../models");
const Op = db.Sequelize.Op;
const sequelize = db.Sequelize;
const mainModel = db.episode;
const Post = db.post;
const Server = db.server;
const errorController = require("./error.controller");

// Hien thi trang danh sách
exports.ListEpisode = async(req, res) => {
    try{
        if(!req.roleAction || !req.roleAction.actview){
            return errorController.render403(req, res);
        }
        var postid = req.params.pid || "";
        var film = await Post.findOne({
            where:{
                id: postid
            },
            attributes: ['id', 'title', 'posttype'],
            raw: true
        });
        if(film==null){
            return errorController.render404(req, res);
        }
        var servers = await Server.findAll({
            attributes:['id', 'name'],
            where:{
                isblock: false
            }
        });
        res.render("admin/episode", {film: film, servers: servers});
    }catch(err){
        return errorController.render500(req, res);
    }    
}

// Lay thong tin theo ID
exports.findOne = async(req, res) => {
    try{
        if(!req.roleAction || !req.roleAction.actview){
            return errorController.render403Ajax(req, res);
        }        
        var id = req.params.id || req.query.id || req.body.id || "";
        mainModel.findOne({
            where: {
                id
            }
        }).then(data => {
            if (data != null) {
                res.json({ code: 1, data });
            } else {
                return errorController.renderNoDataErrorAjax(req, res);
            }
        });
    }catch(err){
        return errorController.render500Ajax(req, res);
    }
}

// Thêm mới
exports.Add = async(req, res) => {
    try{
        if(!req.roleAction || !req.roleAction.actadd){
            return errorController.render403Ajax(req, res);
        }
        var postid = req.body.postid || "";       
        var isblock = req.body.isblock;
        isblock = (isblock == 'on') ? true : false;
        var name = req.body.name || "";
        var slug = functions.convert_slug_episode(name);
        await mainModel.create({            
            name: name,
            url: req.body.url || "",
            slug: slug,
            description: req.body.description || "",
            note: req.body.note || "",
            postid: postid,
            serverid: req.body.serverid || null,
            isblock: isblock            
        }).then(() => {
            return errorController.renderAddSuccessAjax(req, res);
        }).catch(() => {
            return errorController.renderAddErrorAjax(req, res);
        });
    }catch(err){
        console.log(err)
        return errorController.render500Ajax(req, res);
    }    
};

// Load mới
exports.Load = async(req, res) => {
    try{
        if(!req.roleAction || !req.roleAction.actadd){
            return errorController.render403Ajax(req, res);
        }
        var postid = req.body.postid || "",
            serverid = req.body.serverid || "",
            data = req.body.episodes || "",
            dataArr = data.split(/\r\n|\n/g);
        serverid = (serverid=="%") ? "" : serverid;
        if(postid.length<=0 || serverid.length<=0 || dataArr.length<=0){
            return res.json({code: 0, message: "Data chưa hợp lệ"});
        }
        var errorList = [];
        var dataList = [];
        dataArr.forEach(function(d, indx){
            let arr = d.split(/\|/g);
            if(arr.length < 2){
                errorList.push("Lỗi dòng thứ " + (indx + 1))
            }else{
                dataList.push({
                    postid: postid,
                    serverid: serverid,
                    name: arr[0],
                    url: arr[1],
                    slug: functions.convert_slug_episode(arr[0])
                });
            }
        })
        if(dataList.length > 0){
            await mainModel.bulkCreate(dataList);
            return res.json({code: 1, message: "Load thành công", errorData: errorList});
        }
        return res.json({code: 0, message: "Data chưa hợp lệ", errorData: errorList});
    }catch(err){
        console.log(err)
        return errorController.render500Ajax(req, res);
    }    
};

// Sửa
exports.Edit = (req, res) => {
    try{        
        var isblock = req.body.isblock;
        isblock = (isblock == 'on') ? true : false;
        var id = req.body.id || "";
        if(!req.roleAction || !req.roleAction.actedit){
            return errorController.render403Ajax(req, res);
        } 
        mainModel.update({
            name: req.body.name || "",
            url: req.body.url || "",            
            description: req.body.description || "",
            note: req.body.note || "",
            serverid: req.body.serverid || null,
            isblock: isblock
        }, {
            where: {
                id
            }
        }).then(() => {
            return errorController.renderEditSuccessAjax(req, res);
        }).catch(() => {
            return errorController.renderEditErrorAjax(req, res);
        });
    }catch(err){
        return errorController.render500Ajax(req, res);
    } 
}

// Xóa
exports.Delete = async(req, res) => {
    try{
        if(!req.roleAction || !req.roleAction.actdel){
            return errorController.render403Ajax(req, res);
        }
        var id = req.params.id || req.body.id || "";
        mainModel.destroy({
            where: {
                id
            }
        }).then(() => {
            return errorController.renderDelSuccessAjax(req, res);
        }).catch(() => {
            return errorController.renderDelErrorAjax(req, res);
        })
    }catch(err){
        return errorController.render500Ajax(req, res);
    }    
}

// implement update columns toggle (boolean)
exports.UpdateToggleColumn = async(req, res) => {
    try {
        // Check quyen Edit
        if(!req.roleAction || !req.roleAction.actedit){
            return errorController.render403Ajax(req, res);
        }
        var col = req.body.col,
            id = req.params.id || req.body.id,
            value = req.body.value,
            str = `{"${col}" : ${value}}`,
            updateJson = JSON.parse(str);
        var rsUpdate = await mainModel.update(updateJson, { where: { id: id } });
        if (rsUpdate) {
            return errorController.renderEditSuccessAjax(req, res);
        } else {
            return errorController.renderEditErrorAjax(req, res);
        }
    } catch (err) {
        return errorController.render500Ajax(req, res);
    }
}

// Thao tác toolbar
exports.Bulk = (req, res) => {
    try{
        var id = req.params.id || req.body.id,
        action = req.body.action;
        switch(action){
            case "delete":
                req.body.id = id;
                this.Delete(req, res);
                break;
            default:
                return errorController.renderNoDataErrorAjax(req, res);
        }
    }catch(err){
        return errorController.render500Ajax(req, res);
    }    
}

// Phan trang danh sach
exports.DatatableEpisode = async(req, res) => {
    try{
        var postid = req.params.pid || "";
        var where = {
                postid: postid
            },
            column = "id";
        var search = req.query.columns[1].search.value;
        var isblock = req.query.columns[2].search.value || "%";
        isblock = (isblock=="on") ? false : isblock;
        isblock = (isblock=="off") ? true : isblock;            
        if (search) {
            where = {
                [Op.or]: [{
                    name: {
                        [Op.like]: `%${search}%`
                    }
                }, {
                    description: {
                        [Op.like]: `%${search}%`
                    }
                }]
            }
        }
        if(isblock!="%"){
            where.isblock = isblock;
        }
        var start = Number(req.query.start);
        var length = Number(req.query.length);
        if (req.query.order[0].column == 0) column = "id";
        if (req.query.order[0].column == 1) column = "name";
        if (req.query.order[0].column == 1) column = "url";
        if (req.query.order[0].column == 3) column = "description";
        var type = req.query.order[0].dir;
        var roleAction = (req.roleAction) ? req.roleAction : {};
        if (Number.isInteger(start) && Number.isInteger(length)) {
            const data = await mainModel.findAndCountAll({
                where: where,
                include:{
                    model: Server,
                    as: 'server',
                    attributes: ['id', 'name'],
                    required: false
                },
                attributes: {
                    include:[
                        [sequelize.literal(`${(roleAction.actview)?roleAction.actview:0}`), 'roleview'],
                        [sequelize.literal(`${(roleAction.actadd)?roleAction.actadd:0}`), 'roleadd'],
                        [sequelize.literal(`${(roleAction.actedit)?roleAction.actedit:0}`), 'roleedit'],
                        [sequelize.literal(`${(roleAction.actdel)?roleAction.actdel:0}`), 'roledel'],
                        [sequelize.literal(`${req.session.userid}`), 'mine'],
                    ]
                },
                order: [
                    [column, type]
                ],
                offset: start,
                limit: length
            });
            res.json({ aaData: data.rows, iTotalDisplayRecords: data.count, iTotalRecords: data.count });
        } else {
            return errorController.renderPaginationErrorAjax(req, res);
        }
    }catch(err){
        return errorController.renderPaginationErrorAjax(req, res);
    }
}

exports.countEpisode = async() => {
    try{
        return await mainModel.count();
    }catch(err){ return 0 }
}

// Lay thong tin theo ID
exports.getEpisodeById = async(ID) => {
    try{        
        return await mainModel.findOne({
            where: {
                id: ID
            }
        });
    }catch(err){
        return errorController.render500(req, res);
    }
}