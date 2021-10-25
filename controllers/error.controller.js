const { getMenuFontEnd } = require("./menu.controller");

function render403(req, res){
    return res.status(403).render("admin/403");
}

function render403Ajax(req, res){
    return res.status(403).json({code: 0, message: "Bạn không có quyền truy cập trang này"});    
}

async function render404(req, res){
    const postController = require("./post.controller");
    const breadcumbController = require("./breadcumb.controller");
    const schema = require("./seo.schema.controller");
    const seometa = require("./seo.meta.controller");
    var curLang = req.curLang;
    var menuHeader = await getMenuFontEnd(curLang, 'menu-header', "404", 1, req.url);
    var menuFooter = await getMenuFontEnd(curLang, 'menu-footer', "404", 1, req.url);
    // SEO
    var seoTitle = "404";
    var seoDescription = "Trang nay không tồn tại";
    var pageSeoObject = {
        pagetype: "article",
        seotitle: seoTitle,
        seodescription: seoDescription,
        index: false,
        follow: false,
        publishat: new Date(),
        modifyat: new Date(),
        thumb: {},
        icon: {},
        name: "404",
        category: "",
        subcategory: "",
        notenglish: false
    }
    var metaPost = [];
    metaPost = await seometa.postMeta(curLang, req.url, pageSeoObject);
    // SEO schema structure
    var homePage = await postController.getPostBySlug("home", curLang);
    homePage = (!curLang.ismain) ? functions.postMaping(homePage) : homePage;
    var arrSchema = [];
    arrSchema.push(await schema.Organization(curLang, req.languages, homePage));
    arrSchema.push(await schema.WebSite(curLang));
    arrSchema.push(await schema.Article(curLang, req.url, pageSeoObject));
    var arrSchema = [];
    var breadcrumbs = await breadcumbController.createBreadcumb(null, curLang, "404", req.url, res.__("textHome"));
    if (breadcrumbs && breadcrumbs.schema) {
        arrSchema.push(breadcrumbs.schema);
    }
    var page = {
        curLang: curLang,
        seoMeta: metaPost.join(""),
        seoSchema: arrSchema.join(","),
        menuHeader: menuHeader,
        menuFooter: menuFooter,
        breadcrumbs: breadcrumbs
    }
    res.setLocale(curLang.id);
    return res.status(404).render("web/404", { page: page });
}

function render404Ajax(req, res){
    return res.status(404).json({code: 0, message: "Xin lỗi, trang này không tồn tại"});
}

function render500(req, res){
    return res.status(500).render("admin/500");
}

function render500Ajax(req, res){
    return res.status(500).json({code: 0, message: "Xin lỗi, trang bị lỗi. Hãy gửi phản hồi để chúng tôi khắc phục. Xin cảm ơn."});
}

function renderAddSuccessAjax(req, res){
    return res.json({code: 1, message: "Thêm thành công"});
}

function renderAddErrorAjax(req, res){
    return res.json({code: 0, message: "Lỗi, chưa thêm đươc"});
}

function renderEditSuccessAjax(req, res){
    return res.json({code: 1, message: "Cập nhật thành công"});
}

function renderEditErrorAjax(req, res){
    return res.json({code: 0, message: "Lỗi, chưa cập nhật đươc"});
}

function renderDelSuccessAjax(req, res){
    return res.json({code: 1, message: "Xóa thành công"});
}

function renderDelErrorAjax(req, res){
    return res.json({code: 0, message: "Lỗi, chưa xóa đươc"});
}

function renderBulkErrorAjax(req, res){
    return res.json({code: 0, message: "Lỗi, Thao tác sai"});
}

function renderBulkSuccessAjax(req, res){
    return res.json({code: 1, message: "Thao tác thành công"});
}

function renderPaginationErrorAjax(req, res){
    return res.json({code: 0, message: "Lỗi, Không lấy được dữ liệu"});
}

function renderNoDataErrorAjax(req, res){
    return res.json({code: 0, message: "Lỗi, Dữ liệu không tồn tại"});
}

module.exports = {
    render403,
    render403Ajax,
    render404,
    render404Ajax,
    render500,
    render500Ajax,
    renderAddSuccessAjax,
    renderAddErrorAjax,
    renderEditSuccessAjax,
    renderEditErrorAjax,
    renderDelSuccessAjax,
    renderDelErrorAjax,
    renderBulkErrorAjax,
    renderBulkSuccessAjax,
    renderPaginationErrorAjax,
    renderNoDataErrorAjax
}