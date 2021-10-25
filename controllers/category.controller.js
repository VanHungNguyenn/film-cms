const db = require("../models");
const config = require("config");
const cfTable = config.get('database.table');
const tbCategoryName = cfTable.prefix.concat("categories");
const tbCatePostName = cfTable.prefix.concat("post_cates");
const Op = db.Sequelize.Op;
const sequelize = db.Sequelize;
const Type = db.type;
const Media = db.media;
const Category = db.category;
const CateLang = db.catelang;
const Language = db.language;
const Menuitem = db.menuitem;
const User = db.user;
const tracerController = require("./tracer.controller");
const errorController = require('./error.controller');

// Hien thi trang List Category
exports.ListCategory = async(req, res) => {
    try{
        if(!req.roleAction || !req.roleAction.actview){
            return errorController.render403(req, res);
        }
        var catetype = req.params.catetype || "";
        var type = await Type.findOne({
            where: { id: catetype },
            include: {
                model: Type,
                as: 'posttype',
                attributes: ['id', 'name', 'allowindex'],
                through: {
                    attributes: []
                }
            }
        });
        if(type==null){
            return errorController.render404(req, res);
        }
        var categories = await Category.findAll({
            where: {
                [Op.and]: [{
                    catetype: catetype,
                    parentid: {
                        [Op.eq]: null
                    }
                }]
            },
            limit: 10
        });              
        res.render("admin/category", { type, categories, catetype });
    }catch(err){
        return errorController.render500(req, res);
    }
}

// Hien thi trang Edit Category
exports.GetEditCategory = async(req, res) => {
    try{
        var id = req.params.id || "",
            catetype = req.params.catetype || "";
        const category = await Category.findOne({
            where: {
                id: id
            },
            include: [{
                model: db.catelang,
                as: 'CateLang',
                include: [{
                    model: db.language,
                    as: 'Lang',
                    attributes: ['id', 'name']
                }]
            },{
                model: Media,
                as: 'thumb',
                attributes: ['id', 'url', 'urlicon'],
                required: false
            }]
        });
        // Khong co Category nay
        if (category == null) {
            return errorController.render404(req, res);
        }
        // Check quyen Edit hoac Author
        if(category.author !== req.session.userid){
            if(!req.roleAction || !req.roleAction.actedit){
                return errorController.render403(req, res);
            }
        }        
        const type = await Type.findOne({
            where: { id: catetype },
            attributes: ['id', 'name'],
            include: {
                model: Type,
                as: 'posttype',
                attributes: ['id', 'name', 'allowindex'],
                through: {
                    attributes: []
                }
            }
        });
        // Khong co Loai Category nay
        if (type == null) {
            return errorController.render404(req, res);
        }
        // Cac phien bang ngon da tao cua category
        var langs = [];
        category.CateLang.forEach(catelang => {
            langs.push(catelang.langid);
        });
        // Cac ngon ngu khac ma site ho tro
        const languages = await Language.findAll({
            where: {
                [Op.and]: {
                    isblock: {
                        [Op.eq]: false
                    },
                    ismain: {
                        [Op.eq]: false
                    },
                    id: {
                        [Op.notIn]: langs
                    }
                }
            },
            attributes: ['id', 'name']
        });        
        // Danh sach categories cap 1 khac category dang sua
        categories = await Category.findAll({
            where: {
                [Op.and]: [{
                    catetype: catetype,
                    parentid: {
                        [Op.eq]: null
                    },
                    id: {
                        [Op.ne]: category.id
                    }
                }]
            }
        });
        var tracer = await tracerController.getTracking("category", category.id);
        res.render("admin/category-edit", { type, categories, category, languages, catetype, tracer });
    }catch(err){
        return errorController.render500(req, res);
    }
}

// Lay thong tin cua 1 Category
exports.findOne = async(req, res) => {
    try{
        if(!req.roleAction || !req.roleAction.actview){
            return errorController.render403Ajax(req, res);
        }
        var id = req.query.id || req.body.id || req.params.id || "";
        const data = await Category.findOne({
            where: {
                [Op.and]: [{
                    id: id,
                    catetype: req.params["catetype"]
                }]
            }
        });
        if (data != null) {
            return res.json({ code: 1, data });
        }
        return errorController.render404Ajax(req, res);
    }catch(err){
        return errorController.render500Ajax(req, res);
    }
}

// Ajax submit modal add category
exports.AddCategory = async(req, res) => {
    try{
        // Không có quyền thêm mới
        if(!req.roleAction || !req.roleAction.actadd){
            return errorController.render403Ajax(req, res);
        }
        var islikemain = req.body.islikemain;
        islikemain = (islikemain == 'on') ? true : false;
        var allowindex = req.body.allowindex;
        allowindex = (allowindex == 'on') ? true : false;
        var seotitle = req.body.seotitle;
        seotitle = (seotitle === "" || seotitle === null || seotitle === undefined) ? req.body.title : seotitle;
        var seodescription = req.body.seodescription;
        seodescription = (seodescription === null || seodescription === undefined) ? "" : seodescription;
        // Chuyen title thanh SLUG
        var slug = req.body.slug;
        if (slug === "" || slug === null || slug === undefined) {
            slug = functions.convert_slug(req.body.title);
        }        
        // Lay thong tin category parent da chon
        var parentId = (req.body.parent) ? req.body.parent : "";
        const parentCate = await Category.findOne({ where: { id: parentId }, attributes: ['id', 'slug', 'hirarchylevel'] });
        var hirarchylevel = (parentCate) ? parentCate.hirarchylevel + 1 : 1;
        var catetype = req.params.catetype || "";
        slug = (catetype=="category-dd") ? `dd-${slug}` : slug;
        slug = (catetype=="category-dv") ? `dv-${slug}` : slug;
        await Category.create({
            slug: slug,
            fullslug: (parentCate) ? `${parentCate.slug}/${slug}` : slug, //SLUG da cap cho category
            title: req.body.title,
            description: req.body.description,
            seotitle: seotitle,
            seodescription: seodescription,            
            catetype: catetype,
            islikemain: islikemain,            
            allowfollow: allowindex,
            allowindex: allowindex,
            parentid: (parentCate) ? parentCate.id : null,            
            catestatus: req.body.catestatus,
            hirarchylevel: hirarchylevel,
            author: (req.session.userid) ? req.session.userid : null
        }).then(async cate => {
            // add log Add
            await tracerController.addTracking(req.ipAddr, req.userAgent, req.session.userid, "category", cate.id, "add", `Thêm mới ${cate.title}`);
            return errorController.renderAddSuccessAjax(req, res);
        }).catch(() => {            
            return errorController.renderAddErrorAjax(req, res);
        });
    }catch(err){        
        return errorController.render500Ajax(req, res);
    }
}

// Submit edit Category
exports.EditCategory = async(req, res) => {
    try{
        var islikemain = req.body.islikemain;
        islikemain = (islikemain == 'on') ? true : false;       
        var allowindex = req.body.allowindex;
        allowindex = (allowindex == 'on') ? true : false;
        var seotitle = req.body.seotitle;
        seotitle = (seotitle === "" || seotitle === null || seotitle === undefined) ? req.body.title : seotitle;
        var seodescription = req.body.seodescription;
        seodescription = (seodescription === "" || seodescription === null || seodescription === undefined) ? req.body.description : seodescription;
        var slug = req.body.slug;
        if (slug === "" || slug === null || slug === undefined) {
            slug = functions.convert_slug(req.body.title);
        }
        var parentid = req.body.parent;
        parentid = (parentid === "" || parentid === undefined) ? null : parseInt(parentid);        
        var id = req.body.id;
        const curCate = await Category.findOne({ where: { id: id }, attributes: ['id', 'parentid', 'fullslug', 'slug', 'author', 'thumbnail'] });
        // Category khong ton tai
        if(curCate == null){
            return errorController.render404Ajax(req, res);
        }
        // Check quyen Edit hoac Author
        if(curCate.author !== req.session.userid){
            if(!req.roleAction || !req.roleAction.actedit){                
                return errorController.render403Ajax(req, res);
            }
        }
        var hirarchylevel = (curCate) ? curCate.hirarchylevel : 1;
        var objectlangs = "";
        var flagMenuUpdate = false;
        var fullslug = curCate.fullslug;
        if (curCate.parentid != parentid || curCate.slug != slug) {
            // Cập nhật fullslug cho tất cả các cate con và chính nó
            var pCate = await Category.findOne({ where: { id: parentid }, attributes: ['id', 'fullslug', 'hirarchylevel'] });
            fullslug = (pCate != null && pCate.fullslug != null && pCate.fullslug != "") ? pCate.fullslug.concat("/", slug) : slug;
            newSlug = fullslug;
            listChildCates = await Category.findAllChildIds(curCate.id);
            objectlangs = await Category.findCateLangAvailableFullText(curCate.id);
            flagMenuUpdate = true;
            hirarchylevel = (pCate) ? pCate.hirarchylevel + 1 : 1;
        }        
        // Thuc hien lenh update
        const updatedCate = await Category.update({
            slug: slug,
            fullslug: fullslug,
            title: req.body.title,
            description: req.body.description,
            seotitle: seotitle,
            seodescription: seodescription,            
            catetype: req.params.catetype || "",
            islikemain: islikemain,           
            allowfollow: allowindex,
            allowindex: allowindex,
            parentid: parentid,            
            catestatus: req.body.catestatus,
            hirarchylevel: hirarchylevel,
            thumbnail: req.body.thumb || null
        }, {
            where: {
                id
            }
        });
        // Neu update thanh cong
        if (updatedCate == 1) {
            // add log Edit
            await tracerController.addTracking(req.ipAddr, req.userAgent, req.session.userid, "category", id, "edit", `Sửa ${req.body.title}`);
            // Cap nhat menu item ney category dang sua la mot item menu
            if (curCate.islikemain != islikemain) {
                objectlangs = await Category.findCateLangAvailableFullText(curCate.id);
                flagMenuUpdate = true;
            }
            if (flagMenuUpdate) {
                await Menuitem.update({
                    objectslug: fullslug,
                    alllanguage: islikemain,
                    objectlangs: objectlangs
                }, {
                    where: {
                        objectid: curCate.id,
                        type: 'category'
                    }
                });
            }            
            return errorController.renderEditSuccessAjax(req, res);
        } else {
            return errorController.renderEditErrorAjax(req, res);
        }
    }catch(err){
        console.log(err)
        return errorController.render500Ajax(req, res);
    }
}

// Delete Catrgory
exports.DeleteCategory = async(req, res) => {
    try{
        var id = req.params.id || req.body.id || req.query.id || "",
            catetype = req.params.catetype,
            where = {
                id: id,
                catetype: catetype
            };
        if(!req.roleAction || !req.roleAction.actdel){
            where.author = req.session.userid || "";
        }
        var rsDelete = await Category.destroy({
            where: where
        });
        if(rsDelete <= 0){
            return errorController.renderDelErrorAjax(req, res);
        }
        await Menuitem.destroy({
            where: {
                objectid: id,
                type: 'category'
            }
        })
        var lcate = await Category.findAll({
            where: where,
            attributes: ['id', 'title']
        });
        // add tracer
        lcate.forEach(async c =>{
            await tracerController.addTracking(req.ipAddr, req.userAgent, req.session.userid, "category", c.id, "delete", `Xóa ${c.title}`);
        })
        return errorController.renderDelSuccessAjax(req, res);
    }catch(err){
        return errorController.render500Ajax(req, res);
    }
}

// Bulk action List Catrgories
exports.BulkCategory = async(req, res) => {
    try{
        var id = req.body.id || "",
            action = req.body.action || "",
            catetype = req.params.catetype || "",
            where = {
                id: id,
                catetype: catetype
            };
        // Check quyên Edit hoặc Tác giả
        if(!req.roleAction || !req.roleAction.actedit){
            where.author = req.session.userid || "";
        }
        // Check loại thao tác
        if(action == "delete"){
            this.DeleteCategory(req, res);
        }else{            
            let status = "";
            switch(action){
                case "trash":
                    status = "trash";
                    break;
                case "restore":
                    status = "pending";
                    break;
                default:
                    status = "";
                    break;
            }
            if(status==""){
                return errorController.renderBulkErrorAjax(req, res);
            }
            var rsUpdate = await Category.update({
                catestatus: status
            }, {
                where: where
            });
            if(rsUpdate <= 0){
                return errorController.renderBulkErrorAjax(req, res);
            }
            var lcate = await Category.findAll({
                where: where,
                attributes: ['id', 'title']
            });
            // Thêm log
            lcate.forEach(async c =>{
                await tracerController.addTracking(req.ipAddr, req.userAgent, req.session.userid, "category", c.id, action, `${action} ${c.title}`);
            })
            return errorController.renderBulkSuccessAjax(req, res);
        }      
    }catch(err){
        return errorController.render500Ajax(req, res);
    }
}

// Ajax update trang thai 1 cot o trang List
exports.UpdateToggleColumn = async(req, res) => {
    try {
        // Check quyền Edit
        if(!req.roleAction || !req.roleAction.actedit){
            return errorController.render403Ajax(req, res);
        }
        var col = req.body.col,
            id = req.params.id || req.body.id,
            value = req.body.value,
            str = `{"${col}" : ${value}}`;
        if(col=="catestatus"){            
            value = (value=="true") ? "published" : "pending";
            str = `{"${col}" : "${value}"}`;
        }        
        var updateJson = JSON.parse(str);
        var rsUpdate = await Category.update(updateJson, { where: { id: id } });
        if (rsUpdate) {
            return errorController.renderEditSuccessAjax(req, res);
        } else {
            return errorController.renderEditErrorAjax(req, res);
        }
    } catch (err) {
        return errorController.render500Ajax(req, res);
    }

}

// Phan trang Category
exports.Datatable = async(req, res) => {
    var where = {},
        column = "id",
        catetype = req.params.catetype || "";
    var search = req.query.columns[1].search.value;    
    var catestatus = req.query.columns[2].search.value;
    catestatus = (catestatus == "") ? "%" : catestatus;
    var type = await Type.findOne({
        where: {
            id: catetype
        }
    })
    if(type==null){
        return errorController.render404Ajax(req, res);
    }
    var roottext = (type.roottext) ? type.roottext + "/" : "";
    var exttext = (type.exttext) ? type.exttext + "/" : "";
    var op = [{
        title: {
            [Op.like]: `%${search}%`
        },
        catetype: catetype
    }];    
    if (catestatus != "%") {
        op.push({
            catestatus: {
                [Op.like]: `${catestatus}`
            }
        });
    }
    where = {
        [Op.and]: op
    }
    var start = Number(req.query.start);
    var length = Number(req.query.length);
    if (req.query.order[0].column == 1) column = "title";
    if (req.query.order[0].column == 2) column = "slug";
    if (req.query.order[0].column == 3) column = "author";
    if (req.query.order[0].column == 4) column = "postcount";
    if (req.query.order[0].column == 7) column = "updatedAt";
    var type = req.query.order[0].dir;
    var roleAction = (req.roleAction) ? req.roleAction : {};
    if (Number.isInteger(start) && Number.isInteger(length)) {
        const cates = await Category.findAndCountAll({
            where: where,                                   
            attributes: {                
                include:[
                    [sequelize.literal(`(SELECT COUNT(a.postid) FROM ${tbCatePostName} a WHERE a.cateid=${tbCategoryName}.id)`), 'pcount'],
                    [sequelize.literal(`${(roleAction.actview)?roleAction.actview:0}`), 'roleview'],
                    [sequelize.literal(`${(roleAction.actadd)?roleAction.actadd:0}`), 'roleadd'],
                    [sequelize.literal(`${(roleAction.actedit)?roleAction.actedit:0}`), 'roleedit'],
                    [sequelize.literal(`${(roleAction.actdel)?roleAction.actdel:0}`), 'roledel'],
                    [sequelize.literal(`${req.session.userid}`), 'mine'],
                    [
                        sequelize.fn(
                            "concat", 
                            roottext,
                            sequelize.col('fullslug'),
                            exttext
                        ),
                        'permalink'
                    ],
                ]
            },
            include: [{
                model: User,
                as: "Author",
                attributes:['id','username'],
            }],
            order: [
                [column, type]
            ],
            offset: start,
            limit: length
        });
        var total = cates.count;
        res.json({ aaData: cates.rows, iTotalDisplayRecords: total, iTotalRecords: total });
    } else {
        return errorController.renderPaginationErrorAjax(req, res);
    }
}

// Ajax select2 seach
exports.select2Ajax = async(req, res) =>{
    try{
        var catetype = req.params.catetype || "",
            searchText = req.query.term || req.query.q || "%",
            results = [];
        results = await Category.findAll({
            where:{
                title: {
                    [Op.like]: `%${searchText}%`
                },
                catetype: catetype,
                catestatus: "published"
            },
            attributes:['id', 'title'],
            order:[["title", "ASC"]],
            limit: 10
        });
        results = (results==null) ? [] : results;        
        res.json(results);
    }catch(err){
        return res.json([]);
    }
}

// Lấy category by lang and slug
exports.getCategoryByLangAndSlug = async(slug, curLang) => {
    var curLangId = curLang.id;
    var cate = {};
    if (curLang.ismain == true) {
        cate = await Category.findOne({            
            where: {
                slug: slug,
                catestatus: 'published'
            }
        });
    } else {
        cate = await Category.findOne({
            include: [{
                model: CateLang,
                as: "CateLang",
                where: {
                    langid: curLangId
                },
                required: false
            }],
            where: {
                slug: slug,
                catestatus: 'published',
                [Op.or]: {
                    islikemain: true,
                    [Op.and]: {
                        islikemain: false,
                        '$CateLang.langid$': curLangId
                    }
                }
            },
            subQuery: false
        });
    }
    return cate;
}

// Lấy category by lang, slug and catetype
exports.getCategoryByLangSlugCatetype = async(slug, curLang, cateType) => {
    var curLangId = curLang.id;
    var cate = {};
    if (curLang.ismain == true) {
        cate = await Category.findOne({
            where: {
                slug: slug,
                catetype: cateType,
                catestatus: 'published'
            }
        });
    } else {
        cate = await Category.findOne({
            include: [{
                model: CateLang,
                as: "CateLang",
                where: {
                    langid: curLangId
                },
                required: false
            }],
            where: {
                slug: slug,
                catetype: cateType,
                catestatus: 'published',
                [Op.or]: {
                    islikemain: true,
                    [Op.and]: {
                        islikemain: false,
                        '$CateLang.langid$': curLangId
                    }
                }
            },
            subQuery: false
        });
    }
    return cate;
}

// Dùng để lấy category GAMES + APPS cho Sidebar
// Lấy category by lang and parentid parentId = [cateid, cateid]
exports.getCategoryByLangParentSlug = async(parentId, curLang) => {
    var curLangId = curLang.id;
    var cate = {};
    if (curLang.ismain == true) {
        cate = await Category.findAll({
            include: {
                model: Category,
                as: "Parent",
                where: {
                    slug: parentId
                },
                attributes: ['slug'],
                required: true
            },
            where: {
                catestatus: 'published'
            },
            attributes: ['slug', 'fullslug', 'title', 'seotitle', 'parentid']
        });
    } else {
        cate = await Category.findAll({
            include: [{
                model: CateLang,
                as: "CateLang",
                where: {
                    langid: curLangId
                },
                attributes: ['title', 'seotitle'],
                required: false
            }, {
                model: Category,
                as: "Parent",
                where: {
                    slug: parentId
                },
                attributes: ['slug'],
                required: true
            }],
            where: {
                catestatus: 'published',
                [Op.or]: {
                    islikemain: true,
                    [Op.and]: {
                        islikemain: false,
                        '$CateLang.langid$': curLangId
                    }
                }
            },
            attributes: ['slug', 'fullslug', 'title', 'seotitle', 'parentid'],
            subQuery: false
        });
    }
    return cate;
}

// Dùng để lấy category cho Sidebar các catetype khác app
// Lấy category by lang and catetype = [cateid, cateid]
exports.getCategoryByLangCatetype = async(cateType, curLang, numPage, numSize) =>{
    try{
        var offset = ((numPage * numSize) - numSize);
        var curLangId = curLang.id;
        var cate = {};
        if (curLang.ismain == true) {
            cate = await Category.findAll({
                where: {
                    catetype: cateType,
                    catestatus: 'published'
                },
                attributes: ['id','slug', 'fullslug', 'title', 'parentid', 'catetype']
            });
        } else {
            cate = await Category.findAll({
                include: [{
                    model: CateLang,
                    as: "CateLang",
                    where: {
                        langid: curLangId
                    },
                    attributes: ['title'],
                    required: false
                }, ],
                where: {
                    catetype: cateType,
                    catestatus: 'published',
                    [Op.or]: {
                        islikemain: true,
                        [Op.and]: {
                            islikemain: false,
                            '$CateLang.langid$': curLangId
                        }
                    }
                },
                attributes: ['id', 'slug', 'fullslug', 'title', 'parentid', 'catetype'],
                subQuery: false,
                offset: offset,
                limit: numSize
            });
        }
        return cate;
    }catch(err){
        console.log(err);
        return [];
    }
}

// Dùng để lấy Tags cho Sidebar
// Lấy category by lang and catetype = [cateid, cateid]
exports.getCategoryByLangCatetypeSort = async(sortType, cateType, curLang, numPage, numSize) =>{
    try{
        var curLangId = curLang.id,
            cates = {},
            order = [],
            offset = ((numPage * numSize) - numSize);
        switch (sortType) {
            case "popular":
                order.push(["viewcountweek", "desc"]);
                break;
            case "new":
                order.push(["createdAt", "desc"]);
                break;
            default:
                order.push(["updatedAt", "desc"]);
                break;
        }
        if (curLang.ismain == true) {
            cates = await Category.findAll({
                where: {
                    catetype: cateType,
                    catestatus: 'published'
                },
                attributes: ['id','slug', 'fullslug', 'title', 'parentid', 'catetype'],
                order: order,
                offset: offset,
                limit: numSize
            });
        } else {
            cates = await Category.findAll({
                include: [{
                    model: CateLang,
                    as: "CateLang",
                    where: {
                        langid: curLangId
                    },
                    attributes: ['title'],
                    required: false
                }, ],
                where: {
                    catetype: cateType,
                    catestatus: 'published',
                    [Op.or]: {
                        islikemain: true,
                        [Op.and]: {
                            islikemain: false,
                            '$CateLang.langid$': curLangId
                        }
                    }
                },
                attributes: ['id', 'slug', 'fullslug', 'title', 'parentid', 'catetype'],
                order: order,
                offset: offset,
                limit: numSize,
                subQuery: false
            });
        }
        var maxPage = Math.ceil(cates.count / numSize);
            cates.curPage = numPage;
            cates.maxPage = maxPage;
        return cates;
    }catch(err){
        console.log(err);
        return {};
    }
}