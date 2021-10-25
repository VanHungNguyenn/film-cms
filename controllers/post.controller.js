const db = require("../models");
const errorController = require('../controllers/error.controller');
const tracerController = require("./tracer.controller");
const Op = db.Sequelize.Op;
const sequelize = db.Sequelize;
const Post = db.post;
const PostLang = db.postlang;
const Category = db.category;
const Language = db.language;
const User = db.user;
const Type = db.type;
const Media = db.media;
const Menuitem = db.menuitem;
const Episode = db.episode;
const Server = db.server;
const filmAttr = ['id', 'slug', 'title', 'filmname', 'filmtime', 'filmyear', 'filmtype', 'banner_old', 'done', 'thumb_old', 'imdb', 'viewcountweek', 'publishedat', 'modifiedat'];

// // Hien thi trang danh sach Ringtone, Page
exports.ListPost = async(req, res) => {
    try{
        // Không có quyền xem
        if(!req.roleAction || !req.roleAction.actview){
            return errorController.render403(req, res);
        }
        var posttype = req.params.posttype || "",
            categories = [],
            ejstemplate = "admin/post";
        // Lấy Kiểu post và categories của nó
        const type = await Type.findOne({
            where: {
                id: posttype
            },
            include: [{
                model: Type,
                as: 'catetype',
                attributes: ['id', 'name', 'cateitemtype', 'allowsearch']
            }]
        })
        // Lỗi nếu chưa khai báo Kiểu post
        if(type==null){
            return errorController.render404(req, res);
        }
        // Xét Kiểu post là gì để trả về ejs tương ứng
        switch (posttype) {
            case "post-page":
                ejstemplate = "admin/page";
                break;
            case "post-film":
                ejstemplate = "admin/film";
                break;
            default:
                ejstemplate = "admin/post";
                break;
        }
        // Nếu post không có khai báo category thì trả về es luôn
        if (type.catetype.length <= 0) return res.render(ejstemplate, { type, categories, posttype });
        // Lấy tất cả catetype có trong post
        var slugcate = type.catetype.map(ct => ct.id);
        categories = await Category.findAll({
            where: {
                catetype: {
                    [Op.in]: slugcate
                },
                parentid: null
            },
            attributes: ['id', 'title', 'catetype'],
            include: [{
                model: Category,
                as: 'Childrens',
                attributes: ['id', 'title', 'catetype'],
                required: false
            }]
        });
        return res.render(ejstemplate, { type, categories, posttype });
    }catch(err){
        console.log(err);
        return errorController.render500(req, res);
    }
}

// Hien thi trang add new post
exports.GetAddPost = async(req, res) => {
    try{       
        // Không có quyền thêm         
        if(!req.roleAction || !req.roleAction.actadd){
            return errorController.render403(req, res);
        }
        var posttype = req.params.posttype || "",
            text_render = 'admin/post-add';
        // Xét Kiểu post là gì để trả về ejs tương ứng
        switch (posttype) {
            case 'post-film':
                text_render = 'admin/film-add';
                break;
            case 'post-page':
                text_render = 'admin/page-add';
                break;
            default:
                text_render = 'admin/post-add';
        }
        // Lấy Kiểu post và categories của nó
        const type = await Type.findOne({
            where: {
                id: posttype
            },
            attributes: ['id', 'name', 'cateitemtype', 'allowindex', 'allowfollow'],
            include: {
                model: Type,
                as: 'catetype',
                attributes: ['id', 'name', 'cateitemtype', 'allowindex', 'allowfollow'],
                through: {
                    attributes: []
                }
            }
        })
        // Loai postType nay khong ton tai
        if(type==null){
            return errorController.render404(req, res);
        }
        // Danh sach ngon ngu khac ma site ho tro
        const languages = await Language.findAll({
            where: {
                [Op.and]: {
                    isblock: {
                        [Op.eq]: false
                    },
                    ismain: {
                        [Op.eq]: false
                    }
                }
            },
            attributes: ['id', 'name']
        });
        // postType khong co category
        var categories = [];        
        if (type.catetype.length <= 0) {
            return res.render(text_render, { type, categories, languages, posttype });
        }
        var slugcate = [];
        type.catetype.forEach(ct =>{
            //if(ct.cateitemtype=="hierarchy")
            slugcate.push(ct.id);
        });
        // Danh sach tat ca categories cua postType
        categories = await Category.findAll({
            where: {
                [Op.and]: [{
                    catetype: {
                        [Op.in]: slugcate
                    }
                }]
            },       
            attributes: ['id', 'title', 'catetype', 'parentid'],
            raw: true
        })
        // Tao menu multiple level cho category
        categories = functions.createHierarchy(categories);
        return res.render(text_render, { type, categories, languages, posttype });
    }catch(err){
        return errorController.render500(req, res);
    }
}

// Hien thi trang edit post
exports.GetEditPost = async(req, res) => {
    try{        
        var posttype = req.params.posttype || "",
            id = req.params.id || ""
            text_render = 'admin/post-edit',
            mlangid = req.mainLang.id || "";
        switch (posttype) {
            case 'post-film':
                text_render = 'admin/film-edit';
                break;
            case 'post-page':
                text_render = 'admin/page-edit';
                break;
            default:
                text_render = 'admin/post-edit';
        }
        // Loai post dang sua
        var type = await Type.findOne({
            where: {
                id: posttype
            },
            include: {
                model: Type,
                as: 'catetype',
                attributes: ['id', 'name', 'cateitemtype']
            }
        });
        // Loai post khong ton tai
        if(type==null){
            return errorController.render404(req, res);
        }
        // Post dang sua
        var post = await Post.findOne({
            where: {
                id
            },
            include: [{
                model: Category,
                as: 'categories',
                attributes: ['id', 'title', 'catetype']
            }, {
                model: Media,
                as: 'thumb',
                attributes: ['id', 'url', 'urlicon']
            }, {
                model: Media,
                as: 'icon',
                attributes: ['id', 'url', 'urlicon']
            }, {
                model: PostLang,
                as: 'PostLang',
                attributes: ['id', 'langid']
            }]         
        });
        // Post khong ton tai, chuyen ve trang them post moi
        if (post == null) {
            return res.redirect(`/${dashboard}/post/${posttype}/add`);
        }
        // Check quyen sua hoac author
        if(post.author !== req.session.userid){
            if(!req.roleAction || !req.roleAction.actedit){
                return errorController.render403(req, res);
            }
        }
        // Danh sach ngon ngu khac ma site ho tro
        var languages = await Language.findAll({
            where: {
                [Op.and]: {
                    isblock: {
                        [Op.eq]: false
                    },
                    ismain: {
                        [Op.eq]: false
                    }
                }
            },
            attributes: ['id', 'name']
        });
        var categories = [];
        var slugcate = [];
        // Post type khong co category
        if (type.catetype.length <= 0) {            
            return res.render(text_render, { post, type, categories, languages, posttype });
        }
        // Lay nhung categories loai hierarchy hien thi len trang sua
        type.catetype.forEach(ct =>{
            if(ct.cateitemtype=="hierarchy")
                slugcate.push(ct.id);
        });
        categories = await Category.findAll({
            where: {
                [Op.and]: [{
                    catetype: {
                        [Op.in]: slugcate
                    }
                }]
            },       
            attributes: ['id', 'title', 'catetype', 'parentid'],
            raw: true
        })
        // Chuyen cac categories sang dang multilple level
        categories = functions.createHierarchy(categories);
        var tracer = await tracerController.getTracking("post", post.id);
        return res.render(text_render, { post, type, categories, languages, posttype, tracer });
    }catch(err){
        return errorController.render500(req, res);
    }
}

// Lay thong tin post khi update
exports.findOne = async(req, res) => {
    try{
        var id = req.query.id || req.params.id || req.body.id || "",
            posttype = req.params.posttype || "";
        const post = await Post.findOne({
            where: {
                id: id,
                posttype: posttype
            }
        })        
        if(post==null){
            return errorController.renderNoDataErrorAjax(req, res);
        }
        // Check quyen view hoac la author
        if(post.author !== req.session.userid){
            if(!req.roleAction || !req.roleAction.actview){
                return errorController.render403Ajax(req, res);
            }
        }
        return res.json({ code: 1, data });
    }catch(err){
        return errorController.render500Ajax(req, res);
    }
}

// New posts submit
exports.AddPost = async(req, res) => {
    try{
        if(!req.roleAction || !req.roleAction.actadd){
            return errorController.render403Ajax(req, res);
        }
        var islikemain = req.body.islikemain;
        islikemain = (islikemain == 'on') ? true : false;
        var notenglish = req.body.notenglish;
        notenglish = (notenglish == 'on') ? true : false;        
        var allowindex = req.body.allowindex;
        allowindex = (allowindex == 'on') ? true : false;        
        var nolink = req.body.nolink;
        nolink = (nolink == 'on') ? true : false;
        var seotitle = req.body.seotitle;
        seotitle = (seotitle === "" || seotitle === null || seotitle === undefined) ? req.body.title : seotitle;
        var seodescription = req.body.seodescription;
        seodescription = (seodescription === "" || seodescription === null || seodescription === undefined) ? req.body.description : seodescription;
        var slug = req.body.slug;
        if (slug === "" || slug === null || slug === undefined) {
            slug = functions.convert_slug(req.body.title);
        }
        var posttype = req.params["posttype"];
        var slider = req.body.slider;
        slider = (slider == 'on') ? true : false;
        var recommended = req.body.recommended;
        recommended = (recommended == 'on') ? true : false;
        var copyright = req.body.copyright;
        copyright = (copyright == 'on') ? true : false;
        var done = req.body.done;
        done = (done == 'on') ? true : false;
        await Post.create({
            slug: slug,
            title: req.body.title || "",
            description: req.body.description || "",
            note: req.body.note || "",
            content: req.body.content || "",
            seotitle: seotitle,
            seodescription: seodescription,
            islikemain: islikemain,
            notenglish: notenglish,
            allowfollow: allowindex,
            allowindex: allowindex,
            done: done,
            nolink: nolink,
            poststatus: req.body.poststatus,
            publishedat: req.body.publishedat,
            modifiedat: req.body.publishedat,
            posttype: posttype,
            template: req.body.template || null,
            filmyear: req.body.filmyear || "",
            filmtype: req.body.filmtype || "",
            filmtime: req.body.filmtime || "",
            imdb: req.body.imdb || 0,
            filmname: req.body.filmname || "",
            filmdirector: req.body.filmdirector || "",
            slider: slider,
            recommended: recommended,
            copyright: copyright,
            channelplay: req.body.channelplay || "",
            actor_old: req.body.actor_old || "",
            director_old: req.body.director_old || "",
            keyword_old: req.body.keyword_old || ""
        }).then(async post => {
            // add log Add            
            await tracerController.addTracking(req.ipAddr, req.userAgent, req.session.userid, "post", post.id, "add", `Thêm ${post.title}`);
            var cs = req.body.categories || [];
            if (cs.length > 0) {                
                post.setCategories(cs);
                var categoryTL = await Category.findOne({
                    where:{
                        id: cs,
                        catetype: 'category-tl'
                    },
                    attributes: ['id']
                });
                categoryTLID = (categoryTL && categoryTL.id) ? categoryTL.id : "";
                if(categoryTLID!="") post.setDefaultcate(cs[0]);
            }
            if (req.session.userid) {
                post.setAuthor(req.session.userid);
            }            
            if (req.body.thumb) {
                post.setThumb(req.body.thumb || null);
            }
            if (req.body.imgicon) {
                post.setIcon(req.body.imgicon || null);
            }            
            res.json({ code: 1, message: "Thêm thành công", data: post });
        }).catch(() => {
            return errorController.render500Ajax(req, res);
        });
    }catch(err){
        return errorController.render500Ajax(req, res);
    }
}

// Edit posts submit
exports.EditPost = async(req, res) => {
    try {        
        var islikemain = req.body.islikemain;
        islikemain = (islikemain == 'on') ? true : false;
        var notenglish = req.body.notenglish;
        notenglish = (notenglish == 'on') ? true : false;       
        var allowindex = req.body.allowindex;
        allowindex = (allowindex == 'on') ? true : false;
        var done = req.body.done;
        done = (done == 'on') ? true : false;
        var seotitle = req.body.seotitle;
        seotitle = (seotitle === "" || seotitle === null || seotitle === undefined) ? req.body.title : seotitle;
        var seodescription = req.body.seodescription;
        seodescription = (seodescription === "" || seodescription === null || seodescription === undefined) ? req.body.description : seodescription;
        var nolink = req.body.nolink;
        nolink = (nolink == 'on') ? true : false;
        var title = (req.body.title) ? req.body.title : "";
        var slug = req.body.slug;
        if (slug === "" || slug === null || slug === undefined) {
            slug = functions.convert_slug(title);
        }
        var slider = req.body.slider;
        slider = (slider == 'on') ? true : false;
        var recommended = req.body.recommended;
        recommended = (recommended == 'on') ? true : false;
        var copyright = req.body.copyright;
        copyright = (copyright == 'on') ? true : false;
        var thumbid = req.body.thumb;
        thumbid = (thumbid == "" || thumbid == undefined) ? null : thumbid;
        var iconid = req.body.imgicon;
        iconid = (iconid == "" || iconid == undefined) ? null : iconid;
        var id = req.body.id || "";
        const curPost = await Post.findOne({
            where: {
                id
            }
        });
        if (curPost == null) {
            return errorController.render404Ajax(req, res);
        }
        // Check quyen Edit hoac Author
        if(curPost.author !== req.session.userid){
            if(!req.roleAction || !req.roleAction.actedit){
                return errorController.render403Ajax(req, res);
            }
        }
        // auto create redirect page when change slug
        var updateMenuFlag = false;
        updateMenuFlag = (curPost.islikemain != islikemain) ? (curPost.islikemain != islikemain) : updateMenuFlag;
        updateMenuFlag = (curPost.slug != slug) ? (curPost.slug != slug) : updateMenuFlag;
        curPost.slug = slug;
        curPost.title = title;
        curPost.description = req.body.description || "";
        curPost.note = req.body.note || "";
        curPost.content = req.body.content  || "";
        curPost.seotitle = seotitle;
        curPost.seodescription = seodescription;
        curPost.islikemain = islikemain;
        curPost.notenglish = notenglish;
        curPost.done = done;
        curPost.allowfollow = allowindex;
        curPost.allowindex = allowindex;       
        curPost.poststatus = req.body.poststatus;
        curPost.publishedat = req.body.publishedat;
        curPost.modifiedat = req.body.modifiedat || new Date();
        curPost.thumbnail = thumbid;
        curPost.imgicon = iconid;        
        curPost.nolink = nolink;
        curPost.template = req.body.template || null;
        curPost.filmyear = req.body.filmyear || "";
        curPost.filmtype = req.body.filmtype || "";
        curPost.filmtime = req.body.filmtime || "";
        curPost.imdb = req.body.imdb || 0;
        curPost.filmname = req.body.filmname || "";
        curPost.filmdirector = req.body.filmdirector || "";
        curPost.slider = slider;
        curPost.recommended = recommended;
        curPost.copyright = copyright;
        curPost.channelplay = req.body.channelplay || "";
        curPost.actor_old = req.body.actor_old || "";
        curPost.director_old = req.body.director_old || "";
        curPost.keyword_old = req.body.keyword_old || "";
        var cs = req.body.categories || [];
        if(cs.length > 0){
            var categories = await Category.findAll({
                where: {
                    id: cs
                }
            })
            if(!cs.includes(curPost.dcateid)){
                var dcate = "";
                for (var i = 0; i < categories.length; i++) {
                    if (categories[i].catetype=='category-tl') {
                        dcate = categories[i].id;
                        break;
                    }
                }
                if(dcate!=""){
                    curPost.dcateid = dcate;
                }
            }            
            curPost.setCategories(categories);
        }
        await curPost.save();
        // add log Edit
        await tracerController.addTracking(req.ipAddr, req.userAgent, req.session.userid, "post", id, "edit", `Sửa ${req.body.title}`);
        var newSlug = curPost.slug;
        var objectlangs = "";
        if (updateMenuFlag) {
            newSlug = slug;
            objectlangs = await Post.findPostLangAvailableFullText(curPost.id);
            // Neu Post la 1 item menu thi update thong tin cua item menu
            await Menuitem.update({
                slug: newSlug,
                objectlangs: objectlangs,
                alllanguage: islikemain
            }, {
                where: {
                    objectid: curPost.id,
                    type: "post"
                }
            });
        }        
        return errorController.renderEditSuccessAjax(req, res);
    } catch (error) {
        console.log(error)
        return errorController.render500Ajax(req, res);
    }
}

// Action bulk
exports.BulkPost = async(req, res) => {
    var id = req.body.id,
        action = req.body.action,
        where = {
            id: id
        };
    if(!req.roleAction || !req.roleAction.actedit){
        where.author = req.session.userid || "";
    }
    if(action == "delete"){
        this.DeletePost(req, res);
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
        var rsUpdate = await Post.update({
            poststatus: status
        }, {
            where: where
        });
        if(rsUpdate <= 0){
            return errorController.renderBulkErrorAjax(req, res);
        }
        var lpost = await Post.findAll({
            where: where,
            attributes: ['id', 'title']
        });
        // add tracer
        lpost.forEach(async p =>{
            await tracerController.addTracking(req.ipAddr, req.userAgent, req.session.userid, "post", p.id, action, `${action} ${p.title}`);
        })
        return errorController.renderBulkSuccessAjax(req, res);
    }
}

// Ajax update trang thai 1 cot o trang List
exports.UpdateToggleColumn = async(req, res) => {
    try {
        if(!req.roleAction || !req.roleAction.actedit){
            return errorController.render403Ajax(req, res);
        }
        var col = req.body.col || "",
            id = req.params.id || req.body.id,
            value = req.body.value,
            str = `{"${col}" : ${value}}`;
        if(col=="poststatus"){            
            value = (value=="true") ? "published" : "pending";           
            str = `{"${col}" : "${value}"}`;
        }        
        var updateJson = JSON.parse(str);
        var rsUpdate = await Post.update(updateJson, { where: { id: id } });
        if (rsUpdate) {
            return errorController.renderEditSuccessAjax(req, res);
        } else {
            return errorController.renderEditErrorAjax(req, res);
        }
    } catch (err) {
        console.log(err)
        return errorController.render500Ajax(req, res);
    }
}

// Xóa post
exports.DeletePost = async(req, res) => {
    try{
        var id = req.params.id || req.body.id || req.query.id || "",
            posttype = req.params.posttype || "",
            where = {
                id: id,
                posttype: posttype
            };
        if(!req.roleAction || !req.roleAction.actdel){
            where.author = req.session.userid || "";
        }
        var deletePost = await Post.destroy({
            where: where
        });
        if (deletePost <= 0) {
            return errorController.renderDelErrorAjax(req, res);
        }
        await Menuitem.destroy({
            where: {
                objectid: id,
                type: "post"
            }
        });        
        var lpost = await Post.findAll({
            where: where,
            attributes: ['id', 'title']
        });
        // add tracer
        lpost.forEach(async p =>{
            await tracerController.addTracking(req.ipAddr, req.userAgent, req.session.userid, "post", c.id, "delete", `Xóa ${p.title}`);
        })
        return errorController.renderDelSuccessAjax(req, res);
    }catch(err){
        return errorController.render500Ajax(req, res);
    }
}

// Phan tran cho all posttype
exports.Datatable = async(req, res) => {
    try{
        var where = {},
            column = "id",
            posttype = req.params.posttype || "",
            search = "%",
            poststatus = "%",
            isFillSearch = false,
            isNoneWhereCate = true,
            indexFieldSearch = 1;
            indexFieldStatus = 2;
            tableColumns = (req.query.columns) ? req.query.columns : [],
            op = [{
                posttype: posttype
            }],
            whereCategories = [],
            includeDatatable = [{
                model: User,
                as: 'Author',
                attributes: ['id', 'username', 'nickname']
            }];
        // Check xem có Categories trong query tìm không
        tableColumns.forEach(function(col, indx){            
            let searchValue = col.search.value || "";
            if(searchValue.match(/^category/g)){
                let arr = searchValue.split(";");
                if(arr.length==3){                    
                    if(arr[2]!='%'){
                        isNoneWhereCate = false;
                        whereCategories.push({
                            catetype: arr[1] || "",
                            id: parseInt(arr[2])
                        })
                    }
                    // Check nếu tất cả Category điều là '%' (lấy hết)
                    if(!isFillSearch){
                        indexFieldSearch = indx - 1;
                        isFillSearch = !isFillSearch;
                    }
                    indexFieldStatus++;
                }
            }
        });        
        // Điều kiện cho ô tìm kiếm
        search = tableColumns[indexFieldSearch].search.value || search;
        if(search!="%"){
            var user = await User.findOne({where: {username: search}, attributes:['id']});
            if(user!=null){
                op.push({
                    author: user.id
                });
            }else{
                op.push({
                    title: {
                        [Op.like]: `%${search}%`
                    }
                });
            }
        }
        // Gán posttype khi có Categories -> Vị trí ô posttype biến động
        poststatus = tableColumns[indexFieldStatus].search.value || poststatus;        
        // Điều kiện cho ô Trạng thái
        if (poststatus != "%") {
            op.push({
                poststatus: poststatus
            });
        }
        where = {
            [Op.and]: op
        }
        // Điều kiện cho Categories
        if(isNoneWhereCate){
            // Lấy cả những post không có category
            includeDatatable.push({
                model: Category,
                as: 'categories',
                attributes: ['id', 'title', 'catetype', 'postcount'],
                required: false
            });            
        }else{
            // Chỉ lấy những post có category đúng điều kiện tiềm
            includeDatatable.push({
                model: Category,
                as: 'categories',
                attributes: ['id', 'title', 'catetype', 'postcount'],
                where: {
                    [Op.and]: whereCategories
                },
                required: true
            })
        }
        var start = Number(req.query.start);
        var length = Number(req.query.length);
        var colIndex = req.query.order[0].column || 5;
        if (colIndex == 1) column = "title";
        if (colIndex == 2) column = "author";
        if (colIndex == 5) column = "modifiedat";
        // Sort riêng cho film
        if(posttype=="post-film"){            
            if (colIndex == 1) column = "title";
            if (colIndex == 4) column = "filmtype";
            if (colIndex == 5) column = "channelplay";
            if (colIndex == 7) column = "author";
            if (colIndex == 13) column = "modifiedat";
        }
        var type = req.query.order[0].dir;
        var roleAction = (req.roleAction) ? req.roleAction : [];
        if (Number.isInteger(start) && Number.isInteger(length)) {
            const posts = await Post.findAndCountAll({
                where: where,
                include: includeDatatable,
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
            res.json({ aaData: posts.rows, iTotalDisplayRecords: posts.count, iTotalRecords: posts.count });
        } else {
            return errorController.renderPaginationErrorAjax(req, res);
        }
    }catch(err){
        console.log(err);
        return errorController.renderPaginationErrorAjax(req, res);
    }
}

// Phan tran cho all posttype
exports.DatatableFilm = async(req, res) => {
    try{
        var where = {},
            column = "id",
            posttype = "post-film",
            search = "%",
            poststatus = "%",
            done = "%",
            filmtype = "%",
            isFillSearch = false,
            isNoneWhereCate = true,
            indexFieldSearch = 1;
            indexFieldStatus = 2;
            tableColumns = (req.query.columns) ? req.query.columns : [],
            op = [{
                posttype: posttype
            }],
            whereCategories = [],
            includeDatatable = [{
                model: User,
                as: 'Author',
                attributes: ['id', 'username', 'nickname']
            },{
                model: Media,
                as: 'icon',
                attributes: ['id', 'url', 'urlicon']
            }];
        // Check xem có Categories trong query tìm không
        tableColumns.forEach(function(col, indx){            
            let searchValue = col.search.value || "";
            if(searchValue.match(/^category/g)){
                let arr = searchValue.split(";");
                if(arr.length==3){                    
                    if(arr[2]!='%'){
                        isNoneWhereCate = false;
                        whereCategories.push({
                            catetype: arr[1] || "",
                            id: parseInt(arr[2])
                        })
                    }
                    // Check nếu tất cả Category điều là '%' (lấy hết)
                    if(!isFillSearch){
                        indexFieldSearch = indx - 1;
                        isFillSearch = !isFillSearch;
                    }
                    indexFieldStatus++;
                }
            }
        });        
        // Điều kiện cho ô tìm kiếm
        search = tableColumns[indexFieldSearch].search.value || search;
        if(search!="%"){
            var user = await User.findOne({where: {username: search}, attributes:['id']});
            if(user!=null){
                op.push({
                    author: user.id
                });
            }else{
                op.push({
                    title: {
                        [Op.like]: `%${search}%`
                    }
                });
            }
        }
        // Gán posttype khi có Categories -> Vị trí ô posttype biến động
        filmtype = tableColumns[indexFieldStatus].search.value || filmtype;
        // Điều kiện cho ô Trạng thái
        if (filmtype != "%") {
            op.push({
                filmtype: filmtype
            });
        }
        done = tableColumns[indexFieldStatus+1].search.value || done;
        // Điều kiện cho ô Trạng thái
        if (done != "%") {
            done = (done=="1") ? true : false;
            op.push({
                done: done
            });
        }
        poststatus = tableColumns[indexFieldStatus+2].search.value || poststatus;
        // Điều kiện cho ô Trạng thái
        if (poststatus != "%") {
            op.push({
                poststatus: poststatus
            });
        }
        where = {
            [Op.and]: op
        }
        // Điều kiện cho Categories
        if(isNoneWhereCate){
            // Lấy cả những post không có category
            includeDatatable.push({
                model: Category,
                as: 'categories',
                attributes: ['id', 'title', 'catetype', 'postcount'],
                required: false
            });            
        }else{
            // Chỉ lấy những post có category đúng điều kiện tiềm
            includeDatatable.push({
                model: Category,
                as: 'categories',
                attributes: ['id', 'title', 'catetype', 'postcount'],
                where: {
                    [Op.and]: whereCategories
                },
                required: true
            })
        }
        var start = Number(req.query.start);
        var length = Number(req.query.length);
        var colIndex = req.query.order[0].column || 5;
        if (colIndex == 1) column = "title";
        if (colIndex == 2) column = "author";
        if (colIndex == 5) column = "modifiedat";
        // Sort riêng cho film
        if(posttype=="post-film"){            
            if (colIndex == 1) column = "title";
            if (colIndex == 4) column = "filmtype";
            if (colIndex == 5) column = "channelplay";
            if (colIndex == 7) column = "author";
            if (colIndex == 13) column = "modifiedat";
        }
        var type = req.query.order[0].dir;
        var roleAction = (req.roleAction) ? req.roleAction : [];
        if (Number.isInteger(start) && Number.isInteger(length)) {
            const posts = await Post.findAndCountAll({
                where: where,
                include: includeDatatable,
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
            res.json({ aaData: posts.rows, iTotalDisplayRecords: posts.count, iTotalRecords: posts.count });
        } else {
            return errorController.renderPaginationErrorAjax(req, res);
        }
    }catch(err){
        console.log(err);
        return errorController.renderPaginationErrorAjax(req, res);
    }
}

exports.countPostWithType = async(typeID) => {
    try{
        return await Post.count({
            where: {
                posttype: typeID
            }
        })
    }catch(err){
        return 0;
    }
}

// Lấy post theo Slug + Language + Posttype
exports.getPostByLangSlugPosttype = async(slug, curLang, postType) => {
    var curLangId = curLang.id;
    var post = null;
    if (curLang.ismain == true) {
        post = await Post.findOne({
            include: [{
                model: Media,
                as: 'thumb',
                attributes: ['id', 'url', 'urlicon', 'childsizes']
            }, {
                model: Media,
                as: 'icon',
                attributes: ['id', 'url', 'urlicon', 'childsizes']
            }, {
                model: User,
                as: 'Author',
                attributes: ['id', 'username', 'avatar', 'nickname']
            }],
            where: {
                posttype: postType,
                slug: slug,
                poststatus: 'published',
                publishedat: {
                    [Op.lte]: sequelize.fn("NOW")
                }
            }
        });
    } else {
        post = await Post.findOne({
            include: [{
                model: PostLang,
                as: "PostLang",
                where: {
                    langid: curLangId
                },
                required: false
            }, {
                model: Media,
                as: 'thumb',
                attributes: ['id', 'url', 'urlicon', 'childsizes']
            }, {
                model: Media,
                as: 'icon',
                attributes: ['id', 'url', 'urlicon', 'childsizes']
            }, {
                model: User,
                as: 'Author',
                attributes: ['id', 'firstname', 'lastname', 'avatar', 'nickname']
            }],
            where: {
                slug: slug,
                posttype: postType,
                poststatus: 'published',
                publishedat: {
                    [Op.lte]: sequelize.fn("NOW")
                },
                [Op.or]: {
                    islikemain: true,
                    [Op.and]: {
                        islikemain: false,
                        '$PostLang.langid$': curLangId
                    }
                }
            },
            subQuery: false
        });
    }
    return post;
}

// Lấy List POST theo mãng ID danh mục CateIds=[1,2,3,...] + sortType="trending", "new", "popular" - Trừ những ID notCateIds=[1,2,3,..]
exports.getPostByCateIdsLangHasSort = async(sortType, CateIds, notCateIds, curLang, numPage, numSize) => {
    try {
        var offset = ((numPage * numSize) - numSize),
            curLangId = curLang.id,
            posts = {},
            order = [],            
            cateWhere = {};
        if (CateIds !== "%") {
            cateWhere = {                
                id: CateIds
            };
        }
        switch (sortType) {
            case "popular":
                order.push(["viewcountweek", "desc"]);
                break;
            case "new":
                order.push(["publishedat", "desc"]);
                break;
            default:
                order.push(["modifiedat", "desc"]);
                break;
        }
        if (curLang.ismain == true) {
            posts = await Post.findAndCountAll({
                include: [{
                    model: Category,
                    as: 'categories',
                    where: cateWhere,
                    attributes: [],
                    through: {
                        attributes: []
                    },
                    required: true
                }, {
                    model: Media,
                    as: 'thumb',
                    attributes: ['id', 'url', 'urlicon', 'childsizes'],
                    required: false
                }],
                where: {
                    id: {
                        [Op.notIn]: notCateIds
                    },
                    poststatus: 'published',
                    notenglish:false,
                    publishedat: {
                        [Op.lte]: sequelize.fn("NOW")
                    }
                },
                attributes: filmAttr,
                order: order,
                offset: offset,
                limit: numSize
            });
        } else {
            posts = await Post.findAndCountAll({
                include: [{
                    model: Media,
                    as: 'thumb',
                    attributes: ['id', 'url', 'urlicon', 'childsizes']
                }, {
                    model: Category,
                    as: 'categories',
                    attributes: [],
                    through: {
                        attributes: []
                    },
                    where: cateWhere,
                    required: true
                }, {
                    model: PostLang,
                    as: "PostLang",
                    where: {
                        langid: curLangId
                    },
                    attributes: ['title', 'description', 'seodescription', 'seotitle'],
                    required: false
                }],
                attributes: filmAttr,
                where: {
                    id: {
                        [Op.notIn]: notCateIds
                    },
                    poststatus: 'published',
                    publishedat: {
                        [Op.lte]: sequelize.fn("NOW")
                    },
                    [Op.or]: {
                        islikemain: true,
                        [Op.and]: {
                            islikemain: false,
                            '$PostLang.langid$': curLangId,
                        }
                    }
                },
                order: order,
                offset: offset,
                limit: numSize,
                subQuery: false
            });
        }
        var maxPage = Math.ceil(posts.count / numSize);
        posts.curPage = numPage;
        posts.maxPage = maxPage;
        return posts;
    } catch (error) {
        console.log(error);
        return [];
    }
}

// Lấy List POST theo slider=TRUE + sortType="trending", "new", "popular"
exports.getFilmDeCuWithSort = async(sortType, curLang, numPage, numSize) => {
    try {
        var offset = ((numPage * numSize) - numSize),
            curLangId = curLang.id,
            posts = {},
            order = [];
        switch (sortType) {
            case "popular":
                order.push(["viewcountweek", "desc"]);
                break;
            case "new":
                order.push(["publishedat", "desc"]);
                break;
            default:
                order.push(["modifiedat", "desc"]);
                break;
        }
        if (curLang.ismain == true) {
            posts = await Post.findAndCountAll({
                include: [{
                    model: Media,
                    as: 'thumb',
                    attributes: ['id', 'url', 'urlicon', 'childsizes'],
                    required: false
                }],
                where: {
                    recommended: true,
                    poststatus: 'published',
                    notenglish: false,
                    publishedat: {
                        [Op.lte]: sequelize.fn("NOW")
                    }
                },
                attributes: filmAttr,
                order: order,
                offset: offset,
                limit: numSize
            });
        } else {
            posts = await Post.findAndCountAll({
                include: [{
                    model: Media,
                    as: 'thumb',
                    attributes: ['id', 'url', 'urlicon', 'childsizes']
                }, {
                    model: PostLang,
                    as: "PostLang",
                    where: {
                        langid: curLangId
                    },
                    attributes: ['title', 'description', 'seodescription', 'seotitle'],
                    required: false
                }],
                attributes: filmAttr,
                where: {
                    recommended: true,
                    poststatus: 'published',
                    publishedat: {
                        [Op.lte]: sequelize.fn("NOW")
                    },
                    [Op.or]: {
                        islikemain: true,
                        [Op.and]: {
                            islikemain: false,
                            '$PostLang.langid$': curLangId,
                        }
                    }
                },
                order: order,
                offset: offset,
                limit: numSize,
                subQuery: false
            });
        }
        var maxPage = Math.ceil(posts.count / numSize);
        posts.curPage = numPage;
        posts.maxPage = maxPage;
        return posts;
    } catch (error) {
        console.log(error);
        return [];
    }
}

// Lấy List POST theo slider=TRUE + sortType="trending", "new", "popular"
exports.getFilmSliderWithSort = async(sortType, curLang, numPage, numSize) => {
    try {
        var offset = ((numPage * numSize) - numSize),
            curLangId = curLang.id,
            posts = {},
            order = [];
        switch (sortType) {
            case "popular":
                order.push(["viewcountweek", "desc"]);
                break;
            case "new":
                order.push(["publishedat", "desc"]);
                break;
            default:
                order.push(["modifiedat", "desc"]);
                break;
        }
        if (curLang.ismain == true) {
            posts = await Post.findAndCountAll({
                include: [{
                    model: Media,
                    as: 'thumb',
                    attributes: ['id', 'url', 'urlicon', 'childsizes'],
                    required: false
                }],
                where: {
                    slider: true,
                    poststatus: 'published',
                    notenglish: false,
                    publishedat: {
                        [Op.lte]: sequelize.fn("NOW")
                    }
                },
                attributes: filmAttr,
                order: order,
                offset: offset,
                limit: numSize
            });
        } else {
            posts = await Post.findAndCountAll({
                include: [{
                    model: Media,
                    as: 'thumb',
                    attributes: ['id', 'url', 'urlicon', 'childsizes']
                }, {
                    model: PostLang,
                    as: "PostLang",
                    where: {
                        langid: curLangId
                    },
                    attributes: ['title', 'description', 'seodescription', 'seotitle'],
                    required: false
                }],
                attributes: filmAttr,
                where: {
                    slider: true,
                    poststatus: 'published',
                    publishedat: {
                        [Op.lte]: sequelize.fn("NOW")
                    },
                    [Op.or]: {
                        islikemain: true,
                        [Op.and]: {
                            islikemain: false,
                            '$PostLang.langid$': curLangId,
                        }
                    }
                },
                order: order,
                offset: offset,
                limit: numSize,
                subQuery: false
            });
        }
        var maxPage = Math.ceil(posts.count / numSize);
        posts.curPage = numPage;
        posts.maxPage = maxPage;
        return posts;
    } catch (error) {
        console.log(error);
        return [];
    }
}

// Lấy List POST filmType="phim-le", "phim-bo", "anime" + sortType="trending", "new", "popular"
exports.getFilmByTypeWithSort = async(filmType, sortType, curLang, numPage, numSize) => {
    try {
        var offset = ((numPage * numSize) - numSize),
            curLangId = curLang.id,
            posts = {},
            order = [];
        switch (sortType) {
            case "popular":
                order.push(["viewcountweek", "desc"]);
                break;
            case "new":
                order.push(["publishedat", "desc"]);
                break;
            default:
                order.push(["modifiedat", "desc"]);
                break;
        }
        if (curLang.ismain == true) {
            posts = await Post.findAndCountAll({
                include: [{
                    model: Media,
                    as: 'thumb',
                    attributes: ['id', 'url', 'urlicon', 'childsizes'],
                    required: false
                }],
                where: {
                    filmtype: filmType,
                    poststatus: 'published',
                    notenglish: false,
                    publishedat: {
                        [Op.lte]: sequelize.fn("NOW")
                    }
                },
                attributes: filmAttr,
                order: order,
                offset: offset,
                limit: numSize
            });
        } else {
            posts = await Post.findAndCountAll({
                include: [{
                    model: Media,
                    as: 'thumb',
                    attributes: ['id', 'url', 'urlicon', 'childsizes']
                }, {
                    model: PostLang,
                    as: "PostLang",
                    where: {
                        langid: curLangId
                    },
                    attributes: ['title', 'description', 'seodescription', 'seotitle'],
                    required: false
                }],
                attributes: filmAttr,
                where: {
                    filmtype: filmType,
                    poststatus: 'published',
                    publishedat: {
                        [Op.lte]: sequelize.fn("NOW")
                    },
                    [Op.or]: {
                        islikemain: true,
                        [Op.and]: {
                            islikemain: false,
                            '$PostLang.langid$': curLangId,
                        }
                    }
                },
                order: order,
                offset: offset,
                limit: numSize,
                subQuery: false
            });
        }
        var maxPage = Math.ceil(posts.count / numSize);
        posts.curPage = numPage;
        posts.maxPage = maxPage;
        return posts;
    } catch (error) {
        console.log(error);
        return [];
    }
}

// Lấy POST by Language + ID
exports.getPostByID = async (postID, curLang) => {
    var curLangId = curLang.id;
    var post = {};
    if (curLang.ismain == true) {
        post = await Post.findOne({
            include: [{
                model: Media,
                as: 'icon',
                attributes: ['id', 'url', 'urlicon', 'childsizes']
            }, {
                model: Media,
                as: 'thumb',
                attributes: ['id', 'url', 'urlicon', 'childsizes']
            }, {
                model: Episode,
                as: 'episodes',
                include:{
                    model: Server,
                    as: 'server',
                    required: false
                },               
                required: false
            }, {
                model: Category,
                as: 'categories',
                required: false
            }, {
                model: Category,
                as: 'defaultcate',
                attributes: ['id', 'title', 'fullslug', 'slug'],
                require: false
            }, {
                model: User,
                as: 'Author',
                attributes: ['id', 'username', 'nickname', 'avatar'],
                require: false
            }],
            where: {
                id: postID,
                poststatus: 'published',
                publishedat: {
                    [Op.lte]: sequelize.fn("NOW")
                }
            }
        });
    } else {
        post = await Post.findOne({
            include: [{
                model: PostLang,
                as: "PostLang",
                where: {
                    langid: curLangId
                },
                required: false
            }, {
                model: Media,
                as: 'icon',
                attributes: ['id', 'url', 'urlicon', 'childsizes']
            }, {
                model: Media,
                as: 'thumb',
                attributes: ['id', 'url', 'urlicon', 'childsizes']
            }, {
                model: Episode,
                as: 'episodes',
                include:{
                    model: Server,
                    as: 'server',
                    required: false
                },                
                required: false
            }, {
                model: Category,
                as: 'categories',
                required: false
            }, {
                model: Category,
                as: 'defaultcate',
                attributes: ['id', 'title', 'fullslug', 'slug'],
                require: false
            }, {
                model: User,
                as: 'Author',
                attributes: ['id', 'username', 'nickname', 'avatar'],
                require: false
            }],
            where: {
                id: postID,
                poststatus: 'published',
                publishedat: {
                    [Op.lte]: sequelize.fn("NOW")
                },
                [Op.or]: {
                    islikemain: true,
                    [Op.and]: {
                        islikemain: false,
                        '$PostLang.langid$': curLangId
                    }
                }
            },          
            subQuery: false
        });
    }
    return post;
}

// Lấy POST by Language + ID
exports.getPostBySlug = async (slug, curLang) => {
    var curLangId = curLang.id;
    var post = {};
    if (curLang.ismain == true) {
        post = await Post.findOne({
            include: [{
                model: Media,
                as: 'icon',
                attributes: ['id', 'url', 'urlicon', 'childsizes']
            }],
            where: {
                slug: slug,
                poststatus: 'published',
                publishedat: {
                    [Op.lte]: sequelize.fn("NOW")
                }
            }
        });
    } else {
        post = await Post.findOne({
            include: [{
                model: PostLang,
                as: "PostLang",
                where: {
                    langid: curLangId
                },
                required: false
            }, {
                model: Media,
                as: 'icon',
                attributes: ['id', 'url', 'urlicon', 'childsizes']
            }],
            where: {
                slug: slug,
                poststatus: 'published',
                publishedat: {
                    [Op.lte]: sequelize.fn("NOW")
                },
                [Op.or]: {
                    islikemain: true,
                    [Op.and]: {
                        islikemain: false,
                        '$PostLang.langid$': curLangId
                    }
                }
            },          
            subQuery: false
        });
    }
    return post;
}

// Lấy List POST theo slider=TRUE + sortType
exports.getPostByFullParams = async(queryText, sortType, filmType, category, year, country, curLang, numPage, numSize) => {
    try {        
        var offset = ((numPage * numSize) - numSize),
            curLangId = curLang.id,
            posts = {},
            order = [],
            op = [],
            where = {
                poststatus: 'published',                
                publishedat: {
                    [Op.lte]: sequelize.fn("NOW")
                }
            },
            whereCate = {};
        switch (sortType) {
            case "popular":
                order.push(["viewcountweek", "desc"]);
                break;
            case "new":
                order.push(["id", "desc"]);
                break;
            case "year":
                order.push(["filmyear", "desc"]);
                break;
            case "imdb":
                order.push(["imdb", "desc"]);
                break;
            default:
                order.push(["modifiedat", "desc"]);
                break;
        }
        switch (filmType) {
            case "phim-de-cu":
                //where.recommended = true;
                op.push({recommended: true});
                break;
            case "phim-le":
                //where.filmtype = "phim-le";
                op.push({filmtype: 'phim-le'});
                break;
            case "phim-bo":
                //where.filmtype = "phim-bo";
                op.push({filmtype: 'phim-bo'});
                break;
            case "anime":
                //where.filmtype = "anime";
                op.push({filmtype: 'anime'});
                break;
            case "phim-top-imdb":
                order = [["imdb", "desc"]]
                break;
            default:
                break;
        }        
        if(year!="%"){
            //where.filmyear = year;
            op.push({filmyear: 'year'});
        }
        if(queryText!="%"){
            op.push({
                [Op.or]:{
                    title: {
                        [Op.like]: `%${queryText}%`
                    },
                    filmname: {
                        [Op.like]: `%${queryText}%`
                    }
                }                
            })
        }        
        var slugArr = [];
        if(country!="%"){
            slugArr.push(country);
        }
        if(category!="%"){
            slugArr.push(category);            
        }
        if(slugArr.length > 0) whereCate.slug = slugArr;         
        if (curLang.ismain == true) {
            op.push({notenglish: false});
            op.push({
                poststatus: 'published',
                publishedat: {
                    [Op.lte]: sequelize.fn("NOW")
                }
            });
            where = {
                [Op.and]: op
            }
            //where.notenglish = false;
            posts = await Post.findAndCountAll({
                include: [{
                    model: Media,
                    as: 'thumb',
                    attributes: ['id', 'url', 'urlicon', 'childsizes'],
                    required: false
                }, {
                    model: Category,
                    as: 'categories',
                    where: whereCate,
                    required: true
                }],
                where: where,
                attributes: filmAttr,
                order: order,
                offset: offset,
                limit: numSize
            });
        } else {
            op.push({                    
                poststatus: 'published',
                publishedat: {
                    [Op.lte]: sequelize.fn("NOW")
                },
                [Op.or]: {
                    islikemain: true,
                    [Op.and]: {
                        islikemain: false,
                        '$PostLang.langid$': curLangId,
                    }
                }
            });
            where = {
                [Op.and]: op
            }
            posts = await Post.findAndCountAll({
                include: [{
                    model: Media,
                    as: 'thumb',
                    attributes: ['id', 'url', 'urlicon', 'childsizes']
                }, {
                    model: PostLang,
                    as: "PostLang",
                    where: {
                        langid: curLangId
                    },
                    attributes: ['title', 'description', 'seodescription', 'seotitle'],
                    required: false
                }, {
                    model: Category,
                    as: 'categories',
                    where: whereCate,
                    required: true
                }],
                attributes: filmAttr,
                where: where,
                order: order,
                offset: offset,
                limit: numSize,
                subQuery: false
            });
        }
        var maxPage = Math.ceil(posts.count / numSize);
        posts.curPage = numPage;
        posts.maxPage = maxPage;
        return posts;
    } catch (error) {
        console.log(error);
        return [];
    }
}

// Dùng cho search Films
exports.getPostSearch = async(queryText, curLang, numPage, numSize) => {
    try {
        var offset = ((numPage * numSize) - numSize),
            curLangId = curLang.id,
            films = {},
            order = [
                ['viewcount', 'DESC']
            ];
        if (curLang.ismain == true) {
            films = await Post.findAndCountAll({
                include: [{
                    model: Media,
                    as: 'thumb',
                    attributes: ['id', 'url', 'urlicon', 'childsizes']
                },{
                    model: Media,
                    as: 'icon',
                    attributes: ['id', 'url', 'urlicon', 'childsizes']
                }],
                where: {
                    title: {
                        [Op.like]: `%${queryText}%`
                    },
                    posttype: ['post-film'],
                    poststatus: 'published',
                    notenglish: false,
                    publishedat: {
                        [Op.lte]: sequelize.fn("NOW")
                    }
                },
                attributes: filmAttr,
                order: order,
                offset: offset,
                limit: numSize,
                subQuery: false
            });
        } else {
            films = await Post.findAndCountAll({
                include: [{
                    model: PostLang,
                    as: "PostLang",
                    where: {
                        langid: curLangId
                    },
                    attributes: ['title', 'description', 'seodescription', 'seotitle'],
                    required: false
                }, {
                    model: Media,
                    as: 'thumb',
                    attributes: ['id', 'url', 'urlicon', 'childsizes']
                }, {
                    model: Media,
                    as: 'icon',
                    attributes: ['id', 'url', 'urlicon', 'childsizes']
                }],
                attributes: filmAttr,
                where: {
                    title: {
                        [Op.like]: `%${queryText}%`
                    },
                    posttype: ['post-film'],
                    poststatus: 'published',
                    publishedat: {
                        [Op.lte]: sequelize.fn("NOW")
                    },
                    [Op.or]: {
                        islikemain: true,
                        [Op.and]: {
                            islikemain: false,
                            '$PostLang.langid$': curLangId,
                        }
                    }
                },
                order: order,
                offset: offset,
                limit: numSize,
                subQuery: false
            });
        }
        var maxPage = Math.ceil(films.count / numSize);
        films.curPage = numPage;
        films.maxPage = maxPage;
        return films;
    } catch (error) {
        console.log(error);
        return [];
    }
}