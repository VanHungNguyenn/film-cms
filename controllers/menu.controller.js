const db = require("../models");
const Op = db.Sequelize.Op;
const Menu = db.menu;
const Menuitem = db.menuitem;
const Menuitemlang = db.menuitemlang;
const Post = db.post;
const Category = db.category;
const Type = db.type;
const Language = db.language;
const errorController = require("./error.controller");
var xssFilters = require('xss-filters');
var ejs = require('ejs');
// Màn hình quản lý menu trong Admin
exports.showMenu = async(req, res) => {
    try{
        if(!req.roleAction || !req.roleAction.actview){
            return errorController.render403Ajax(req, res);
        }
        var menuid = req.params.id || "";
        var menus = await Menu.findAll();
        var cmenu = null;
        if(menuid==""){
            cmenu = (menus[0]) ? menus[0] : null;
        }else{
            menus.forEach(m => {
                if(m.id==menuid){
                    cmenu = m;
                    return;
                }
            })
        }
        if(cmenu==null){
            return res.json({code: 0, message: "Menu không tồn tại"});
        }
        var items = await Menuitem.findAll({
            where:{
                menuid: cmenu.id
            },
            include:{
                model: Menuitemlang,
                as: "mitemlangs"
            },
            order:[["numsort","asc"]]
        });
        var mitems = items.map(item => {
            var mitemlangs = (item.mitemlangs) ? item.mitemlangs : [];
            return {
                id: item.id,
                parentid: item.parentid,
                objectid: item.objectid,
                type: item.type,
                objecttitle: item.objecttitle,
                objectlangs: item.objectlangs,
                mitemlangs: mitemlangs.map(mil => {
                    return {langid: mil.langid, name: mil.name};
                })
            }
        })
        var menujson = functions.createHierarchy(mitems);
        menujson = (menujson) ? menujson : [];
        return res.render("admin/menu", {menus, cmenu, menujson});
    }catch(err){
        return res.json({code:0, message: "Error"});
    }
}

// Ajax thêm menu mới
exports.addMenu = async(req, res) => {
    try{
        if(!req.roleAction || !req.roleAction.actadd){
            return errorController.render403Ajax(req, res);
        }
        var menuName = req.body.name || "";
        if(menuName==""){
            return res.json({code: 0, message: "Tên menu không được rỗng"});
        }
        var id = functions.convert_slug(menuName);
        await Menu.create({
            id: id,
            name: menuName
        }).then(menu => {
            return res.json({code: 1, message: "Thêm thành công", data: menu})
        }).catch(() => {
            return res.json({code: 0, message: "Tên menu đã tồn tại"});
        })
    }catch(err){
        return errorController.render500Ajax(req, res);
    }
}

// Ajax save menu
exports.editMenu = async(req, res) => {
    try{
        if(!req.roleAction || !req.roleAction.actedit){
            return errorController.render403Ajax(req, res);
        }
        var id = req.body.id || "",
            name = req.body.name || "",
            items = req.body.items;
        var menu = await Menu.findOne({where:{id:id}});
        if(name==null){
            return res.json({code: 0, message: "Tên menu không được rỗng"});
        }       
        if(menu==null){
            return res.json({code: 0, message: "Menu không tồn tại"});
        }
        menu.name = name;
        menu.save();
        var mainlang = await Language.findOne({
            where:{
                ismain: true
            },
            attributes: ['id', 'name']
        });
        if(mainlang==null){
            return res.json({code:0, message: "Chưa cài đặt ngôn ngữ chính cho site"});
        }
        var miids = await saveMenuItem(mainlang, id, null, items);
        miids = (miids) ? miids : [];
        if(miids.length > 0){
            await Menuitem.destroy({
                where:{
                    menuid: id,
                    id: {
                        [Op.notIn] : miids
                    }
                }
            })
        }
        return res.json({code: 1, message: "Lưu menu thành công"});
    }catch(err){
        return errorController.render500Ajax(req, res);
    }
}

// Ajax xóa menu
exports.delMenu = async(req, res) => {
    try{
        if(!req.roleAction || !req.roleAction.actdel){
            return errorController.render403Ajax(req, res);
        }
        var menuid = req.params.id || "";
        if(menuid==""){
            return res.json({code:0, message: "Mã menu không tồn tại"});
        }
        var delCount = await Menu.destroy({
            where:{
                id: menuid
            }
        })
        if(delCount > 0){
            return errorController.renderDelSuccessAjax(req, res);
        }
        return errorController.renderDelErrorAjax(req, res);
    }catch(err){
        return errorController.render500Ajax(req, res);
    }
}

// Ajax lấy category cho menu item
exports.menuAjaxCategories = async(req, res) =>{
    try{
        if(!req.roleAction || !req.roleAction.actview){
            return [];
        }    
        var searchText = req.query.term || req.query.q || "%",
            results = [];        
        results = await Category.findAll({
            where:{
                title: {
                    [Op.like]: `${searchText}%`
                },
                catestatus: "published"
            },
            attributes:['id', 'title'],
            order:[["title", "ASC"]],
            limit: 15
        });
        results = (results==null) ? [] : results;        
        return res.json(results);
    }catch(err){
        return [];
    }
}

// Ajax lấy post cho menu item
exports.menuAjaxPosts = async(req, res) =>{
    try{
        if(!req.roleAction || !req.roleAction.actview){
            return [];
        }    
        var searchText = req.query.term || req.query.q || "%",
            results = [];        
        results = await Post.findAll({
            where:{
                title: {
                    [Op.like]: `${searchText}%`
                },
                poststatus: "published"
            },
            attributes:['id', 'title'],
            order:[["title", "ASC"]],
            limit: 15
        });
        results = (results==null) ? [] : results;        
        return res.json(results);
    }catch(err){
        return [];
    }
}

// Ajax add menu item HTML vào menu đang sửa, chưa lưu dữ liệu vào database
exports.getMenuItemTemplate = async(req, res) =>{
    try{
        if(!req.roleAction || !req.roleAction.actview){
            return errorController.render403Ajax(req, res);
        }
        var mi = {
            id: "",
            objectid: req.body.id || 0,
            type: req.body.object || "",
            objecttitle: ""
        },
        miindex = req.body.index || 0,
        milangs = [],
        id = mi.objectid;
        switch(mi.type){
            case "home":
                var langs = await Language.findAll({
                    where:{
                        isblock: false
                    },
                    attributes:['id']
                })                
                mi.objecttitle = "Trang chủ";
                milangs = langs.map(lang => {
                    return {id: lang.id, name: mi.objecttitle};
                })
                break;
            case "language":                
                mi.objecttitle="Ngôn ngữ";
                break;
            case "post":
                var post = await Post.findOne({
                    where:{
                        id: id
                    },
                    attributes:['id','title']
                })
                if(post!=null){
                    var langs = await Post.findPostLangAvailableFullText(id);
                    var langids = (langs) ? langs.split(",") : [];
                    mi.objecttitle = post.title;
                    milangs = langids.map(langid => {
                        return {id: langid, name: mi.objecttitle};
                    })
                }
                break;
            case "category":
                var category = await Category.findOne({
                    where:{
                        id: id
                    },
                    attributes: ['id', 'title']
                })
                if(category!=null){
                    var langs = await Category.findCateLangAvailableFullText(id);
                    var langids = (langs) ? langs.split(",") : [];
                    mi.objecttitle = category.title;
                    milangs = langids.map(langid => {
                        return {id: langid, name: mi.objecttitle};
                    })
                }
                break;
            default:
                break;
        }
        if(mi.objecttitle==""){
            return errorController.renderNoDataErrorAjax(req, res);
        }        
        var html = await ejs.renderFile("views/admin/templates/menu-item.ejs", { mitem: mi, miindex: miindex, milangs: milangs }, { async: true });
        return res.json({code: 1, message: "Thành công", data: html})
    }catch(err){
        return errorController.renderNoDataErrorAjax(req, res);
    }
}

// Lấy menu của 1 trang font end
exports.getMenuFontEnd = async (curLang, menuId, pageType, pageId, curUrl, notEnglish) => {
	curUrl = xssFilters.inHTMLData(curUrl);
    var domainLang = (curLang.ismain) ? domain : `${domain}/${curLang.id}`;  
    var curSlugPageView = (curLang.ismain) ? curUrl : curUrl.replace(new RegExp(`^\/${curLang.id}`, 'g'), "");
    var menu = await Menuitem.findMenuByLang(menuId, curLang.id);
    var menuHierarchy = await functions.createHierarchy(menu);
    var rs = [],
        rsObj = {},
        url = "",
        pageviewLangs = [],
        hasLanguageMenu = false;
    menuHierarchy.forEach(mi => {
        if (mi.type == "language") {
            hasLanguageMenu = true;
        } else {
            url = (mi.type == "home") ? domainLang : `${domainLang}/${mi.objectslug}/`;
            var icon = (mi.icon) ? mi.icon : '';
            var nofollow = (menuId=="menu-footer") ? `rel="nofollow"` : "";
            rs.push(`<li><a href="${url}" title="${mi.name}" ${nofollow}>${icon}<span>${mi.name}</span></a></li>`);
        }
    });
    if (hasLanguageMenu) {
        var itemLangs = "";
        if (pageType == "404") {
            pageviewLangs = [];
			curUrl = '';
        } else if (pageType == "cate") {
            pageviewLangs = await Category.findCateLangAvailable(curLang.id, pageId);
        } else {
            pageviewLangs = await Post.findPostLangAvailable(curLang.id, pageId);
        }
        if (pageviewLangs == null || pageviewLangs.length == 0) {
            itemLangs = `<div class="language">
                        <a class="btn-icon" href="${domain}${curUrl}" rel="nofollow">
                            <img class="icon" src="${domain}/assets/image/flags/${curLang.id}.png" alt="${curLang.id}">
                            <span>${curLang.name}</span>
                        </a>
                    </div>`;
        } else {
            itemLangs = `<div class="language box-dropdown">
                            <a class="btn-icon dd-toggle" href="${domain}${curUrl}" rel="nofollow">
                                <img class="icon" src="${domain}/assets/image/flags/${curLang.id}.png" alt="${curLang.id}">
                                <span>${curLang.name}</span>
                            </a><div class="dd-content">`;
            var showEnglishLangLink = (notEnglish == undefined || notEnglish == false);
            pageviewLangs.forEach(pwlang => {
                if(showEnglishLangLink || (!showEnglishLangLink && pwlang.ismain==false)){
                    url = (pwlang.ismain) ? `${domain}${curSlugPageView}` : `${domain}/${pwlang.id}${curSlugPageView}`;
                    itemLangs += `<a href="${url}">${pwlang.name}</a>`;
                }
            });
            itemLangs += `</div></div>`;
        }
        //rs.push(itemLangs);
        rsObj.language = itemLangs;
    }
    if(rsObj.language){
        rsObj.menu = rs.join("");
        return rsObj;
    }
    return rs.join("");
}

// Thực hiện save danh sách menu item khi bấm nút SAVE
async function saveMenuItem(mainlang, menuid, parentid, items){
    var miids = [];
    for(let i=0; i<items.length; i++){
        var midata = items[i];
        var langs = (midata.langs) ? Object.values(midata.langs) : [];
        var mi = {
            menuid: menuid,
            type: midata.type,
            parentid: parentid
        };
        var miid = midata.id;
        if(miid=="" || miid==undefined){
            // Thực hiện thêm mới nếu menu item chưa tồn tại
            switch(midata.type){
                // menu item là ngôn ngữ
                case "language":                        
                    mi.alllanguage = true;
                    mi.name = "Ngôn ngữ";
                    mi.objectid = 0;
                    mi.objecttitle = "Ngôn ngữ";
                    mi.numsort = i+1;
                    mi.objectlangs = "";
                    break;
                // menu item là trang chủ
                case "home":                                               
                    mi.alllanguage = true;
                    mi.name = langs.find(lang => {
                        if(lang.id==mainlang.id)
                            return lang;
                    }).name;
                    mi.objectid = 0;
                    mi.objecttitle = mi.name;
                    mi.numsort = i+1;
                    mi.objectlangs = Object.values(langs).map(lang => {
                        return lang.id;
                    }).join(",");
                    mi.mitemlangs = langs.map(lang => {
                        return {langid: lang.id, name: lang.name};
                    })
                    break;
                // menu item là bài viết
                case "post":                        
                    var post = await Post.findOne({
                        where:{
                            id: midata.oid
                        },
                        include:{
                            model: Type,
                            as: "Type",
                            attributes: ['roottext', 'exttext']
                        },
                        attributes: ['id', 'title', 'slug', 'islikemain']
                    })
                    post = (post) ? post : {};
                    mi.alllanguage = (post.islikemain) ? post.islikemain : false;
                    mi.name = langs.find(lang => {
                        if(lang.id==mainlang.id)
                            return lang;
                    }).name;
                    mi.objectid = midata.oid;
                    mi.objecttitle = mi.name;
                    mi.numsort = i+1;
                    mi.objectlangs = await Post.findPostLangAvailableFullText(mi.objectid);
                    mi.objectslug = `${(post.Type.roottext)?post.Type.roottext + '/' : ''}${post.slug}${post.Type.exttext}`;
                    mi.mitemlangs = langs.map(lang => {
                        return {langid: lang.id, name: lang.name};
                    })
                    break;
                // menu item là danh mục
                case "category":                        
                    var category = await Category.findOne({
                        where:{
                            id: midata.oid
                        },
                        include:{
                            model: Type,
                            as: "Type",
                            attributes: ['roottext', 'exttext']
                        },
                        attributes: ['id', 'title', 'fullslug', 'islikemain']
                    })
                    category = (category) ? category : {};
                    mi.alllanguage = (category.islikemain) ? category.islikemain : false;
                    mi.name = langs.find(lang => {
                        if(lang.id==mainlang.id)
                            return lang;
                    }).name;
                    mi.objectid = midata.oid;
                    mi.objecttitle = mi.name;
                    mi.numsort = i+1;
                    mi.objectlangs = await Category.findCateLangAvailableFullText(mi.objectid);
                    mi.objectslug = `${(category.Type.roottext)?category.Type.roottext + '/' : ''}${category.fullslug}${category.Type.exttext}`;
                    mi.mitemlangs = langs.map(lang => {
                        return {langid: lang.id, name: lang.name};
                    })
                    break;
            }                
            var mirs = await Menuitem.create(mi);
            miid = mirs.id;
            var mitemlangs = (mi.mitemlangs) ? mi.mitemlangs : [];
            if(mitemlangs.length > 0){
                var mils = mitemlangs.filter(m => {
                    if(m.langid != mainlang.id)
                        return m;
                })
                var milsdata = mils.map(m => {
                    return {langid: m.langid, name: m.name, mitemid: miid};
                })                    
                await Menuitemlang.bulkCreate(milsdata);
            }
            miids.push(miid);
        }else{
            // Thực hiện update nếu menu item đã tồn tại
            miids.push(parseInt(miid));
            await Menuitem.update({
                numsort: i+1,
                parentid: parentid
            },{
                where:{
                    id: miid
                }
            })
            if(langs.length > 0){
                langs.forEach(async function(mil){
                    var langid = mil.id;
                    var mitemid = miid;
                    var name = mil.name;
                    var count = await Menuitemlang.count({
                        where:{
                            mitemid: mitemid,
                            langid: langid
                        }
                    })
                    if(count > 0){
                        await Menuitemlang.update({
                            name: name
                        },{
                            where:{
                                mitemid: mitemid,
                                langid: langid
                            }
                        })
                    }else{
                        await Menuitemlang.create({
                            mitemid: mitemid,
                            langid: langid,
                            name: name
                        })
                    }                    
                })
            }
        }
        // Duyệt menu item con
        var childs = (midata.children) ? midata.children : [];
        if(childs.length > 0){
            var cmiids = await saveMenuItem(mainlang, menuid, miid, childs);
            cmiids = (cmiids) ? cmiids : [];
            cmiids.forEach(function(id){
                miids.push(id);
            })            
        }
    }
    return miids;
}