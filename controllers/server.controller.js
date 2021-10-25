const db = require("../models");
const Op = db.Sequelize.Op;
const sequelize = db.Sequelize;
const ServerFilm = db.server;
const errorController = require("./error.controller");

// Hien thi trang danh sách
exports.List = (req, res) => {
    try{
        if(!req.roleAction || !req.roleAction.actview){
            return errorController.render403(req, res);
        }        
        res.render("admin/server");
    }catch(err){
        return errorController.render500(req, res);
    }    
}

// Lay thong tin theo ID
exports.findOne = (req, res) => {
    try{
        if(!req.roleAction || !req.roleAction.actview){
            return errorController.render403Ajax(req, res);
        }
        var id = req.params.id || req.query.id || req.body.id;
        ServerFilm.findOne({
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
        var isblock = req.body.isblock;
        isblock = (isblock == 'on') ? true : false;
        await ServerFilm.create({            
            name: req.body.name || "",
            description: req.body.description || "",
            isblock: isblock
        }).then(() => {
            return errorController.renderAddSuccessAjax(req, res);
        }).catch(() => {
            return errorController.renderAddErrorAjax(req, res);
        });
    }catch(err){
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
        ServerFilm.update({
            name: req.body.name,            
            description: req.body.description,
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
exports.Delete = (req, res) => {
    try{
        if(!req.roleAction || !req.roleAction.actdel){
            return errorController.render403Ajax(req, res);
        }
        var id = req.params.id || req.body.id || "";
        ServerFilm.destroy({
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
        // Check quyen Edit banner
        if(!req.roleAction || !req.roleAction.actedit){
            return errorController.render403Ajax(req, res);
        }
        var col = req.body.col,
            id = req.params.id || req.body.id,
            value = req.body.value,
            str = `{"${col}" : ${value}}`,
            updateJson = JSON.parse(str);
        var rsUpdate = await ServerFilm.update(updateJson, { where: { id: id } });
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
exports.Datatable = async(req, res) => {
    try{
        var where = {},
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
        if (req.query.order[0].column == 2) column = "description";
        var type = req.query.order[0].dir;
        var roleAction = (req.roleAction) ? req.roleAction : {};
        if (Number.isInteger(start) && Number.isInteger(length)) {
            const servers = await ServerFilm.findAndCountAll({
                where: where,
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
            res.json({ aaData: servers.rows, iTotalDisplayRecords: servers.count, iTotalRecords: servers.count });
        } else {
            return errorController.renderPaginationErrorAjax(req, res);
        }
    }catch(err){
        return errorController.renderPaginationErrorAjax(req, res);
    }
}