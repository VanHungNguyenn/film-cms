const express = require('express');
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const config = require("config");
const serverCf = config.get("server");
const domain = config.get("server.domain");
const dashboard = config.get("server.dashboard");
const functions = require('./libs/functions');
const cors = require('cors');
const compress = require('compression');
const app = express();
var i18n = require("i18n");
const db = require("./models");
const corsOptions = {
    origin: "*"
};
app.use(compress());
app.use(cors(corsOptions));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
// SEO file
app.use("/", express.static(__dirname + "/static", { etag: false }));
// Duong dan static files /assets cho Admin
app.use(`/${dashboard}/assets`, express.static(__dirname + "/public/admin"));
// Duong dan static files /assets cho Fontend
app.use("/assets", express.static(__dirname + "/public/web/assets"));
// Thu muc update images
app.use("/uploads", express.static(__dirname + "/uploads"));
// Parse requests of content-type - application/json
app.use(bodyParser.json({ limit: '50mb' }));
// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser("_secret_"));
app.use(session({
    secret: serverCf.secret,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }
}));
// Bien toan cuc dung tren cac routes
global.domain = domain;
global.dashboard = dashboard;
global.functions = functions;
global.sitename = "zphimmoi.com";
global.sitenameSlug = "zphimmoi";
// Bien toan cuc dung tren file ejs
app.locals.domain = domain;
app.locals.dashboard = dashboard;
app.locals.functions = functions;
app.locals.sitename = "zphimmoi.com";
app.locals.sitenameSlug = "zphimmoi";
app.locals.menuCateTL = [];
app.locals.menuCateQG = [];
app.locals.menuCateTags = [];
app.locals.sidebarPhimLe = [];
app.locals.sidebarPhimBo = [];

// Auto create table with its data into the database
const initController = require("./controllers/initdb.controller");
db.sequelize.sync({ force: false, alter: true }).then(() => {
    //initController.initial();
});

// Cấu hình ngôn ngữ
app.use(i18n.init);
const Language = db.language;
Language.findAll({
    where: {
        isblock: false
    },
    attributes: ['id'],
    raw: true
}).then(langs => {
    var langids = langs.map(lang => lang.id);
    i18n.configure({
        locales: langids,
        directory: __dirname + '/locales',
        cookie: 'lang',
    });
})

const cateController = require('./controllers/category.controller');
const postController = require('./controllers/post.controller');
// Khai báo ngôn ngữ cho site
app.use(async function(req, res, next) {
    var url = req.url,
        slug = url.replace(/^\/|\.html$|\/$/g, ""),
        arrSlug = slug.split("/"),
        curLangId = arrSlug[0],
        mainLang = {},
        curLang = {};
    const langs = await Language.findAll({
        where: {
            isblock: false
        },
        attributes: ['id', 'name', 'codelang', 'area', 'ismain'],
        raw: true
    });
    langs.forEach(l => {
        if (l.ismain) {
            mainLang = l;
        }
        if (l.id == curLangId) {
            curLang = l;
        }
    });
    curLang = (curLang.id === undefined) ? mainLang : curLang;       
	res.cookie('lang', curLang.id, { maxAge: 900000 });
    req.languages = langs;
    req.curLang = curLang;
    req.mainLang = mainLang;
    res.setLocale(curLang.id);
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        agent = req.get('User-Agent');
    ip = (ip == "::1") ? "127.0.0.1" : ip;
    ip = ip.split(":").pop();
    req.ipAddr = ip;
    req.userAgent = agent;
    res.locals.cookies = req.cookies;
    res.locals.session = req.session;    
    if (req.method.toLocaleLowerCase() == "get") {
        req.session.ajaxpagetoken = functions.shuffle();
    }
    // Lấy Thể loại + quốc gia + tags
    if(!slug.match(/\/admin/g)){
        var cateTL = await cateController.getCategoryByLangCatetype("category-tl", curLang,1,10);
        var cateQG = await cateController.getCategoryByLangCatetype("category-qg", curLang);
        var cateTags = await cateController.getCategoryByLangCatetypeSort("new", "tags", curLang, 1, 16);
        var phimLe = await postController.getFilmByTypeWithSort("phim-le","popular", curLang, 1, 6);
        var phimBo = await postController.getFilmByTypeWithSort("phim-bo","popular", curLang, 1, 6);
        
        res.locals.menuCateTL = (cateTL) ? cateTL : [];
        res.locals.menuCateQG = (cateQG) ? cateQG : [];
        res.locals.menuCateTags = (cateTags && cateTags.rows) ? cateTags.rows : [];
        res.locals.sidebarPhimLe = (phimLe && phimLe.rows) ? phimLe.rows : [];
        res.locals.sidebarPhimBo = (phimBo && phimBo.rows) ? phimBo.rows : [];

    }
    var fullURL = req.protocol + '://' + req.get('host') + req.originalUrl;
    req.fullURL = fullURL;
    req.homeURL = (curLang.ismain) ? domain : `${domain}/${curLang.id}`;
    next();
});

// Admin URL
const { authCookie, authRedirect, authAdminPage, authHeader } = require("./middleware/authJwt");
app.use(`/${dashboard}`, authHeader, authCookie, authAdminPage, require("./routes/admin"));
app.get("/login", authCookie, authRedirect, (req, res) => {
    res.render("admin/login");
});
app.use("/auth", require("./routes/admin/auth.routes.js"));
const AuthToken = db.auth;
app.get("/logout", (req, res) => {
    var username = req.session.username || "";
    req.session.destroy(() => {
        AuthToken.update({
            isblock: true
        },{
            where:{
                username: username
            }
        })
        res.cookie('token', "", { maxAge: 0, httpOnly: true });
        res.redirect(`/login`);
    })
});

// Fontend URL
app.use("/", authCookie, require("./routes/web/index.js"));

const errorController = require("./controllers/error.controller");
// 404 error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Show page Error handler
app.use(function(err, req, res, next) {
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    console.log(err)
    return errorController.render404(req, res);
});

// Run Server
const PORT = serverCf.port || 8080;
app.listen(PORT, () => {    
    console.log(`Server is running on port ${PORT}`);
});