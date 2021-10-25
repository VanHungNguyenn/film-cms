const db = require('../models');
/* const Op = db.Sequelize.Op;
const sequelize = db.Sequelize;
const Post = db.post; */
const Category = db.category;
var xssFilters = require('xss-filters');

const postController = require("./post.controller");
const cateController = require("./category.controller");
const episodeController = require("./episode.controller");
const errorController = require("./error.controller");
const schema = require('./seo.schema.controller');
const seometa = require('./seo.meta.controller');
const breadcumbController = require('./breadcumb.controller');

exports.homePage = async (req, res) => {
    try {
        return await execHomePage(req, res);
    } catch (err) {
        return errorController.render500(req, res);
    }
}

exports.phimPage = async (req, res) => {
    try {
        return await execPhimPage(req, res);
    } catch (err) {
        return errorController.render500(req, res);
    }
}

exports.watchPage = async (req, res) => {
    try {
        return await execWatchPage(req, res);
    } catch (err) {
        return errorController.render500(req, res);
    }
}

exports.downloadPage = async (req, res) => {
    try {
        return await execDownloadPage(req, res);
    } catch (err) {
        return errorController.render500(req, res);
    }
}

exports.downloadEpisodePage = async (req, res) => {
    try {
        return await execDownloadEpisodePage(req, res);
    } catch (err) {
        return errorController.render500(req, res);
    }
}

exports.categoryPage = async (req, res) => {
    try {
        var slug = req.params.slug || "";
        var pageExecuteArr = ['phim-de-cu', 'phim-le', 'phim-bo', 'phim-top-imdb', 'phim-chieu-rap', 'anime'];
        if (pageExecuteArr.includes(slug)) return await execCategoryPageFromPage(req, res);
        return await execCategoryPage(req, res);
    } catch (err) {
        return errorController.render500(req, res);
    }
}

exports.searchPage = async (req, res) => {
    try {
        return await execSearchPage(req, res);
    } catch (err) {
        return errorController.render500(req, res);
    }
}

// Xử lý tập hợp URL của Home
async function execHomePage(req, res) {
    try {
        var curLang = req.curLang,
            //query = req.query.s || "",
            preview = req.query.preview || "";
        // Thực thi trang search (Khi URL có tham số s)
        /* if (query !== "") {
            return await execSearchPage(req, res);
        } */
        // Thực thi xem trước bài viết chưa publish (Khi URL có tham số priview)
        if (preview !== "") {
            return await execPreviewPage(req, res);
        }
        // Lấy thông tin trang HOME
        var pageContent = await postController.getPostByLangSlugPosttype("home", curLang, "post-page");
        if (pageContent == null) {
            return errorController.render500(req, res);
        }
        // Parse thông tin trang HOME nếu truy cập ngôn ngữ phụ
        pageContent = (!curLang.ismain) ? functions.postMaping(pageContent) : pageContent;
        // Show posts to home        
        let homeAllTimeHits = [
            {
                id:1,
                title: 'The warrior life',
                slug: 'the-warrior-life',
                image: '/assets/images/background/asset-1.jpg',
                time: '2hr 00mins'
            }, 
            {
                id:2,
                title: 'Machine war',
                slug: 'machine-war',
                image: '/assets/images/background/asset-2.jpg',
                time: '2hr 00mins'
            }, 
             {
                id:3,
                title: 'The horse lady',
                slug: 'the-horse-lady',
                image: '/assets/images/background/asset-3.jpg',
                time: '2hr 00mins'
            },
             {
                id:4,
                title: 'Ship of full moon',
                slug: 'ship-of-full-moon',
                image: '/assets/images/background/asset-4.jpg',
                time: '2hr 00mins'
            },
            {
                id:5,
                title: 'Ship of full moon',
                slug: 'ship-of-full-moon',
                image: '/assets/images/background/asset-5.jpg',
                time: '2hr 00mins'
            },
            {
                id:6,
                title: 'Ship of full moon',
                slug: 'ship-of-full-moon',
                image: '/assets/images/background/asset-6.jpg',
                time: '2hr 00mins'
            },
        ];
        let homeFilmDeCu = await postController.getFilmSliderWithSort("popular", curLang, 1, 24);
        let homeFilmDeCuMoi = await postController.getFilmDeCuWithSort("updated", curLang, 1, 24);
        let homeFilmLeUpdated = await postController.getFilmByTypeWithSort("phim-le","updated", curLang, 1, 24);
        let homeFilmBoUpdated = await postController.getFilmByTypeWithSort("phim-bo","updated", curLang, 1, 24);
        let homeFilmAnimeUpdated = await postController.getFilmByTypeWithSort("anime","updated", curLang, 1, 24);
        let homeFilmLeMoi = await postController.getFilmByTypeWithSort("phim-le","new", curLang, 1, 11);
        let homeFilmBoMoi = await postController.getFilmByTypeWithSort("phim-bo","new", curLang, 1, 11);
        let homeFilmAnimeMoi = await postController.getFilmByTypeWithSort("anime","new", curLang, 1, 11);
        // SEO
        var seoTitle = (pageContent.seotitle == "") ? pageContent.title : pageContent.seotitle;
        var seoDescription = (pageContent.seodescription == "") ? pageContent.description : pageContent.seodescription;
        var homeSeoObject = {
            pagetype: "website",
            seotitle: seoTitle,
            seodescription: seoDescription,
            index: pageContent.allowindex || false,
            publishat: pageContent.publishedat,
            modifyat: pageContent.modifiedat
        }
        var metaHome = await seometa.homeMeta(curLang, req.url, homeSeoObject);
        // SEO schema structure
        var arrSchema = [];
        arrSchema.push(await schema.Organization(curLang, pageContent));
        arrSchema.push(await schema.WebSite(curLang));
        arrSchema.push(await schema.ImageObject(curLang, req.url, pageContent.thumb));
        var page = {
            curLang: curLang,
            seoMeta: metaHome.join(""),
            seoSchema: arrSchema.join(","),
            pageContent: pageContent,
            homeAllTimeHits: homeAllTimeHits,
            homeFilmDeCu: homeFilmDeCu,
            homeFilmDeCuMoi: homeFilmDeCuMoi,
            homeFilmLeMoi: homeFilmLeMoi,
            homeFilmBoMoi: homeFilmBoMoi,
            homeFilmAnimeMoi: homeFilmAnimeMoi,
            homeFilmLeUpdated: homeFilmLeUpdated,
            homeFilmBoUpdated: homeFilmBoUpdated,
            homeFilmAnimeUpdated: homeFilmAnimeUpdated
        };
        res.render("web/index", { page: page });
    } catch (err) {
        console.log(err);
        return errorController.render500(req, res);
    }
}

// Xử lý tập hợp URL của Phim
async function execPhimPage(req, res) {
    try {
        var curLang = req.curLang,
            slug = req.params.slug || "",
            match = slug.match(/\d+$/g),
            id = match[0] || "";
        // Lấy thông tin trang HOME
        var pageContent = await postController.getPostByID(id, curLang);
        var checkSlug = `${req.homeURL}/movie/${pageContent.slug}-${id}/` || "";
        var acceptURL = req.fullURL || "";
        if (pageContent == null || acceptURL == "" || checkSlug != acceptURL) {
            return errorController.render404(req, res);
        }
        var cateTL = [];
        var cateQG = [];
        var cateDV = [];
        var cateDD = [];
        var cateTags = [];
        var cateIDS = [];
        var categories = (pageContent.categories) ? pageContent.categories : [];
        categories.forEach(c => {
            var category = c;
            if (c.catetype == 'category-qg') cateQG.push(category);
            if (c.catetype == 'category-dv') cateDV.push(category);
            if (c.catetype == 'category-dd') cateDD.push(category);
            if (c.catetype == 'tags') cateTags.push(category);
            if (c.catetype == 'category-tl') {
                cateTL.push(category);
                cateIDS.push(category.id);
            }
        });
        // Parse thông tin trang HOME nếu truy cập ngôn ngữ phụ
        pageContent = (!curLang.ismain) ? functions.postMaping(pageContent) : pageContent;
        // Lấy film cùng thể loại updated gần nhất
        var filmRelated = await postController.getPostByCateIdsLangHasSort("updated", cateIDS, [pageContent.id], curLang, 1, 16);

        // SEO Meta tags
        var seoTitle = (pageContent.seotitle == "") ? pageContent.title : pageContent.seotitle;
        var seoDescription = (pageContent.seodescription == "") ? pageContent.description : pageContent.seodescription;
        var homePage = await postController.getPostBySlug("home", curLang);
        homePage = (!curLang.ismain) ? functions.postMaping(homePage) : homePage;
        var imgRectangle = pageContent.thumb || {};
        var imgSquare = pageContent.icon || {};

        var defcateid = pageContent.dcateid || null;
        if (defcateid == null) { // Đã khai báo category nhưng chưa cập nhật default category ID vào POST
            defcateid = await Category.getCateMinHirarchyLevel(pageContent.id);
            defcateid = (defcateid) ? defcateid : 1; // Nếu chưa khai báo Category cho POST thì cho về 1 = Uncategory
            defcateid = (pageContent.posttype == "post-page") ? null : defcateid; // Nếu chưa khai báo Category cho POST thì cho về 1 = Uncategory
        }
        var hierarchyCate = await Category.findAllParentsSEO(defcateid, curLang.id);
        hierarchyCate = (hierarchyCate) ? hierarchyCate : [];
        var currentCategory = (hierarchyCate.length > 0) ? hierarchyCate[hierarchyCate.length - 1] : {};
        var pageSeoObject = {
            pagetype: "article",
            seotitle: seoTitle,
            seodescription: seoDescription,
            index: pageContent.allowindex || false,
            follow: pageContent.allowindex || false,
            publishat: (pageContent.publishedat) ? pageContent.publishedat : pageContent.createdAt,
            modifyat: pageContent.updatedAt,
            thumb: imgRectangle,
            icon: imgSquare,
            author: pageContent.author || "0",
            name: pageContent.title,
            category: (hierarchyCate.length > 0) ? hierarchyCate[0].title : "",
            subcategory: currentCategory.title || "",
            notenglish: pageContent.notenglish
        }
        var metaPost = [];
        metaPost = await seometa.postMeta(curLang, req.url, pageSeoObject);
        // SEO schema structure
        var arrSchema = [];
        var person = {
            id: pageContent.Author.id || "0",
            name: pageContent.Author.nickname || pageContent.Author.username || "",
            description: pageContent.Author.nickname || pageContent.Author.username || "",
            avatar: pageContent.Author.avatar || "/assets/imgs/no-image-100.gif"
        };
        arrSchema.push(await schema.Organization(curLang, req.languages, homePage));
        arrSchema.push(await schema.WebSite(curLang));
        arrSchema.push(await schema.Article(curLang, req.url, pageSeoObject));
        arrSchema.push(await schema.Person(curLang, person));
        // SEO breadcumb & pagination
        var breadcrumbs = await breadcumbController.createBreadcumb(defcateid, curLang, pageContent.title || "", req.url, res.__("textHome"));
        if (breadcrumbs && breadcrumbs.schema) {
            arrSchema.push(breadcrumbs.schema);
        }
        var page = {
            curLang: curLang,
            seoMeta: metaPost.join(""),
            seoSchema: arrSchema.join(","),
            pageContent: pageContent,
            filmRelated: filmRelated,
            cateTL: cateTL,
            cateQG: cateQG,
            cateDV: cateDV,
            cateDD: cateDD,
            cateTags: cateTags,
            breadcrumbs: breadcrumbs
        };
        res.render("web/single-film", { page: page });
    } catch (err) {
        console.log(err);
        return errorController.render500(req, res);
    }
}

// Xử lý tập hợp URL của Xem Phim
async function execWatchPage(req, res) {
    try {
        var curLang = req.curLang,
            slug = req.params.slug || "",
            match = slug.match(/\d+$/g),
            id = match[0] || "",
            eslug = req.params.episode || "",
            match2 = eslug.match(/\d+$/g),
            episodeID = match2[0] || "";
        // Lấy thông tin trang HOME
        var pageContent = await postController.getPostByID(id, curLang);
        var episode = await episodeController.getEpisodeById(episodeID);
        episode = (episode) ? episode : {};
        var episodeName = (episode.name) ? functions.getEpisodeName(episode.name) : "";
        var checkSlug = `${req.homeURL}/movie/${pageContent.slug}-${id}/${episode.slug}-${episode.id}.html` || "";
        var acceptURL = req.fullURL || "";
        if (pageContent == null || acceptURL == "" || checkSlug != acceptURL) {
            return errorController.render404(req, res);
        }
        var cateTL = [];
        var cateQG = [];
        var cateDV = [];
        var cateDD = [];
        var cateTags = [];
        var cateIDS = [];
        var categories = (pageContent.categories) ? pageContent.categories : [];
        categories.forEach(c => {
            var category = c;
            if (c.catetype == 'category-qg') cateQG.push(category);
            if (c.catetype == 'category-dv') cateDV.push(category);
            if (c.catetype == 'category-dd') cateDD.push(category);
            if (c.catetype == 'tags') cateTags.push(category);
            if (c.catetype == 'category-tl') {
                cateTL.push(category);
                cateIDS.push(category.id);
            }
        });
        // Parse thông tin trang HOME nếu truy cập ngôn ngữ phụ
        pageContent = (!curLang.ismain) ? functions.postMaping(pageContent) : pageContent;
        // Lấy film cùng thể loại updated gần nhất
        var filmRelated = await postController.getPostByCateIdsLangHasSort("updated", cateIDS, [pageContent.id], curLang, 1, 12);

        // SEO Meta tags
        var seoTitle = (pageContent.seotitle == "") ? pageContent.title : pageContent.seotitle;
        seoTitle += (episodeName.length > 0) ? ` ${episodeName}` : "";
        var seoDescription = (pageContent.seodescription == "") ? pageContent.description : pageContent.seodescription;
        seoDescription += (episodeName.length > 0) ? `Xem phim ${pageContent.title} ${episodeName}` : "";
        var homePage = await postController.getPostBySlug("home", curLang);
        homePage = (!curLang.ismain) ? functions.postMaping(homePage) : homePage;
        var imgRectangle = pageContent.thumb || {};
        var imgSquare = pageContent.icon || {};

        var defcateid = pageContent.dcateid || null;
        if (defcateid == null) { // Đã khai báo category nhưng chưa cập nhật default category ID vào POST
            defcateid = await Category.getCateMinHirarchyLevel(pageContent.id);
            defcateid = (defcateid) ? defcateid : 1; // Nếu chưa khai báo Category cho POST thì cho về 1 = Uncategory
            defcateid = (pageContent.posttype == "post-page") ? null : defcateid; // Nếu chưa khai báo Category cho POST thì cho về 1 = Uncategory
        }
        var hierarchyCate = await Category.findAllParentsSEO(defcateid, curLang.id);
        hierarchyCate = (hierarchyCate) ? hierarchyCate : [];
        var currentCategory = (hierarchyCate.length > 0) ? hierarchyCate[hierarchyCate.length - 1] : {};
        var pageSeoObject = {
            pagetype: "article",
            seotitle: seoTitle,
            seodescription: seoDescription,
            index: pageContent.allowindex || false,
            follow: pageContent.allowindex || false,
            publishat: episode.createdAt,
            modifyat: episode.updatedAt,
            thumb: imgRectangle,
            icon: imgSquare,
            author: pageContent.author || "0",
            name: `${pageContent.title} ${episodeName}`,
            category: (hierarchyCate.length > 0) ? hierarchyCate[0].title : "",
            subcategory: currentCategory.title || "",
            notenglish: pageContent.notenglish
        }
        var metaPost = [];
        metaPost = await seometa.postMeta(curLang, req.url, pageSeoObject);
        // SEO schema structure
        var arrSchema = [];
        var person = {
            id: pageContent.Author.id || "0",
            name: pageContent.Author.nickname || pageContent.Author.username || "",
            description: pageContent.Author.nickname || pageContent.Author.username || "",
            avatar: pageContent.Author.avatar || "/assets/imgs/no-image-100.gif"
        };
        arrSchema.push(await schema.Organization(curLang, req.languages, homePage));
        arrSchema.push(await schema.WebSite(curLang));
        arrSchema.push(await schema.Article(curLang, req.url, pageSeoObject));
        arrSchema.push(await schema.Person(curLang, person));
        // SEO breadcumb & pagination
        var hierarchyCate = [];
        hierarchyCate.push({
            slug: `phim/${pageContent.slug}`,
            title: pageContent.title
        });
        var breadcrumbs = await breadcumbController.createBreadcumb(defcateid, curLang, episodeName, req.url, res.__("textHome"), hierarchyCate);
        if (breadcrumbs && breadcrumbs.schema) {
            arrSchema.push(breadcrumbs.schema);
        }
        var page = {
            curLang: curLang,
            seoMeta: metaPost.join(""),
            seoSchema: arrSchema.join(","),
            pageContent: pageContent,
            filmRelated: filmRelated,
            cateTL: cateTL,
            cateQG: cateQG,
            cateDV: cateDV,
            cateDD: cateDD,
            cateTags: cateTags,
            episode: episode,
            breadcrumbs: breadcrumbs
        };
        res.render("web/watch", { page: page });
    } catch (err) {
        console.log(err);
        return errorController.render500(req, res);
    }
}

// Xử lý tập hợp URL của Category
async function execCategoryPage(req, res) {
    try {
        var curLang = req.curLang,
            slug = req.params.slug || "",
            page = req.query.page || 1,
            curUrl = req.url;
        page = parseInt(page);
        // Lấy thông tin trang HOME
        var pageContent = await cateController.getCategoryByLangAndSlug(slug, curLang);
        if (pageContent == null) {
            return errorController.render404(req, res);
        }
        // Parse thông tin trang HOME nếu truy cập ngôn ngữ phụ
        pageContent = (!curLang.ismain) ? functions.cateMaping(pageContent) : pageContent;
        // Lấy film cùng thể loại updated gần nhất
        var films = await postController.getPostByCateIdsLangHasSort("updated", [pageContent.id], [], curLang, page, 24);
        // SEO
        var seoTitle = (pageContent.seotitle == "") ? pageContent.title : pageContent.seotitle;
        var seoDescription = (pageContent.seodescription == "") ? pageContent.description : pageContent.seodescription;
        var homeSeoObject = {
            pagetype: "object",
            cateslug: pageContent.slug,
            seotitle: seoTitle,
            seodescription: seoDescription,
            index: pageContent.allowindex || false,
            publishat: pageContent.createdAt,
            modifyat: pageContent.updatedAt
        }
        var metaCate = [],
            maxPage = films.maxPage || 0,
            curPage = page;
        metaCate = await seometa.cateMeta(curLang, curUrl, homeSeoObject, curPage, maxPage);
        // SEO schema structure
        var homePage = await postController.getPostBySlug("home", curLang);
        homePage = (!curLang.ismain) ? functions.postMaping(homePage) : homePage;
        var arrSchema = [];
        arrSchema.push(await schema.Organization(curLang, homePage));
        arrSchema.push(await schema.WebSite(curLang));
        arrSchema.push(await schema.CollectionPage(curLang, curUrl, homeSeoObject));
        // SEO breadcumb & pagination
        var breadcrumbs = await breadcumbController.createBreadcumb(pageContent.id, curLang, null, req.url, res.__("textHome"));
        if (breadcrumbs && breadcrumbs.schema) {
            arrSchema.push(breadcrumbs.schema);
        }
        var page = {
            curLang: curLang,
            seoMeta: metaCate.join(""),
            seoSchema: arrSchema.join(","),
            pageContent: pageContent,
            films: films,
            breadcrumbs: breadcrumbs
        };
        res.render("web/archive-film", { page: page });
    } catch (err) {
        console.log(err);
        return errorController.render500(req, res);
    }
}

// Xử lý tập hợp URL của Category
async function execCategoryPageFromPage(req, res) {
    try {
        var curLang = req.curLang,
            slug = req.params.slug || "",
            page = req.query.page || 1,
            year = req.query.year || "%",
            country = req.query.country || "%",
            curUrl = req.url;
        page = parseInt(page);
        // Lấy thông tin trang HOME
        var pageContent = await postController.getPostBySlug(slug, curLang);
        if (pageContent == null) {
            return errorController.render404(req, res);
        }
        // Parse thông tin trang HOME nếu truy cập ngôn ngữ phụ
        pageContent = (!curLang.ismain) ? functions.postMaping(pageContent) : pageContent;
        // Lấy film cùng thể loại updated gần nhất
        var films = await postController.getPostByFullParams("%", "updated", slug, "%", year, country, curLang, page, 24);
        // SEO
        var seoTitle = (pageContent.seotitle == "") ? pageContent.title : pageContent.seotitle;
        var seoDescription = (pageContent.seodescription == "") ? pageContent.description : pageContent.seodescription;
        var homeSeoObject = {
            pagetype: "object",
            cateslug: pageContent.slug,
            seotitle: seoTitle,
            seodescription: seoDescription,
            index: pageContent.allowindex || false,
            publishat: pageContent.createdAt,
            modifyat: pageContent.updatedAt
        }
        var metaCate = [],
            maxPage = films.maxPage || 0,
            curPage = page;
        metaCate = await seometa.cateMeta(curLang, curUrl, homeSeoObject, curPage, maxPage);
        // SEO schema structure
        var homePage = await postController.getPostBySlug("home", curLang);
        homePage = (!curLang.ismain) ? functions.postMaping(homePage) : homePage;
        var arrSchema = [];
        arrSchema.push(await schema.Organization(curLang, homePage));
        arrSchema.push(await schema.WebSite(curLang));
        arrSchema.push(await schema.CollectionPage(curLang, curUrl, homeSeoObject));
        // SEO breadcumb & pagination
        var breadcrumbs = await breadcumbController.createBreadcumb(null, curLang, pageContent.title, curUrl, res.__("textHome"));
        if (breadcrumbs && breadcrumbs.schema) {
            arrSchema.push(breadcrumbs.schema);
        }

        var page = {
            seoMeta: metaCate.join(""),
            seoSchema: arrSchema.join(","),
            curLang: curLang,
            pageContent: pageContent,
            films: films,
            breadcrumbs: breadcrumbs,
            paginationData: functions.getPreAndNextLink(curUrl, curPage)
        };
        res.render(`web/archive-film-page`, { page: page });
    } catch (err) {
        console.log(err);
        return errorController.render500(req, res);
    }
}

// Xử lý tập hợp URL của Search
async function execSearchPage(req, res) {
    try {
        var curLang = req.curLang,
            query = req.query.s || "",
            page = req.query.page || 1,
            sort = req.query.sort || "%",
            type = req.query.type || "%",
            theloai = req.query.tl || "%",
            country = req.query.country || "%",
            year = req.query.year || "%";
        query = xssFilters.inHTMLData(query);
        page = xssFilters.inHTMLData(page);
        sort = xssFilters.inHTMLData(sort);
        type = xssFilters.inHTMLData(type);
        theloai = xssFilters.inHTMLData(theloai);
        country = xssFilters.inHTMLData(country);
        year = xssFilters.inHTMLData(year);
        page = parseInt(page);
        // Lấy thông tin trang HOME
        var pageContent = await postController.getPostBySlug("home", curLang);
        if (pageContent == null) {
            return errorController.render404(req, res);
        }
        // Parse thông tin trang HOME nếu truy cập ngôn ngữ phụ
        pageContent = (!curLang.ismain) ? functions.postMaping(pageContent) : pageContent;
        pageContent.title = `Tìm kiếm ${query}`;
        var postSearch = await postController.getPostByFullParams(query, sort, type, theloai, year, country, curLang, page, 24);
        // SEO Meta tags        
        var seoTitle = `Tìm kiếm ${query}`;
        var seoDescription = `Kết quả tìm kiếm phim theo từ khóa ${query}`;
        var homeSeoObject = {
            pagetype: "object",
            seotitle: seoTitle,
            seodescription: seoDescription,
            index: pageContent.allowindex || false,
            follow: pageContent.allowindex || false,
            publishat: pageContent.publishedat,
            modifyat: pageContent.updatedAt
        }
        var metaHome = await seometa.homeMeta(curLang, "", homeSeoObject);
        // SEO schema structure
        var arrSchema = [];
        var breadcrumbs = await breadcumbController.createBreadcumb(null, curLang, pageContent.title, req.url, res.__("textHome"));
        if (breadcrumbs && breadcrumbs.schema) {
            arrSchema.push(breadcrumbs.schema);
        }
        var page = {
            curLang: curLang,
            seoMeta: metaHome.join(""),
            seoSchema: arrSchema.join(","),
            pageContent: pageContent,
            films: postSearch,
            breadcrumbs: breadcrumbs
        };
        console.log(postSearch);
        res.render("web/search", { page: page });
    } catch (err) {
        console.log(err);
        return errorController.render500(req, res);
    }
}

// Xử lý tập hợp URL của tải phim
async function execDownloadPage(req, res) {
    try {
        var curLang = req.curLang,
            slug = req.params.slug || "",
            match = slug.match(/\d+$/g),
            id = match[0] || "";
        // Lấy thông tin trang HOME
        var pageContent = await postController.getPostByID(id, curLang);
        var checkSlug = `${req.homeURL}/download/${pageContent.slug}-${id}/` || "";
        var acceptURL = req.fullURL || "";
        if (pageContent == null || acceptURL == "" || checkSlug != acceptURL) {
            return errorController.render404(req, res);
        }
        var cateTL = [];
        var cateQG = [];
        var cateDV = [];
        var cateDD = [];
        var cateTags = [];
        var cateIDS = [];
        var categories = (pageContent.categories) ? pageContent.categories : [];
        categories.forEach(c => {
            var category = c;
            if (c.catetype == 'category-qg') cateQG.push(category);
            if (c.catetype == 'category-dv') cateDV.push(category);
            if (c.catetype == 'category-dd') cateDD.push(category);
            if (c.catetype == 'tags') cateTags.push(category);
            if (c.catetype == 'category-tl') {
                cateTL.push(category);
                cateIDS.push(category.id);
            }
        });
        // Parse thông tin trang HOME nếu truy cập ngôn ngữ phụ
        pageContent = (!curLang.ismain) ? functions.postMaping(pageContent) : pageContent;
        // Lấy film cùng thể loại updated gần nhất
        var filmRelated = await postController.getPostByCateIdsLangHasSort("updated", cateIDS, [pageContent.id], curLang, 1, 12);
        // SEO Meta tags
        var seoTitle = (pageContent.seotitle == "") ? `Link tải phim ${pageContent.title}` : pageContent.seotitle;
        var seoDescription = (pageContent.seodescription == "") ? `Tổng hợp Link tải phim ${pageContent.title} - ${pageContent.filmname}` : pageContent.seodescription;
        var homePage = await postController.getPostBySlug("home", curLang);
        homePage = (!curLang.ismain) ? functions.postMaping(homePage) : homePage;
        var imgRectangle = pageContent.thumb || {};
        var imgSquare = pageContent.icon || {};

        var defcateid = pageContent.dcateid || null;
        if (defcateid == null) { // Đã khai báo category nhưng chưa cập nhật default category ID vào POST
            defcateid = await Category.getCateMinHirarchyLevel(pageContent.id);
            defcateid = (defcateid) ? defcateid : 1; // Nếu chưa khai báo Category cho POST thì cho về 1 = Uncategory
            defcateid = (pageContent.posttype == "post-page") ? null : defcateid; // Nếu chưa khai báo Category cho POST thì cho về 1 = Uncategory
        }
        var hierarchyCate = await Category.findAllParentsSEO(defcateid, curLang.id);
        hierarchyCate = (hierarchyCate) ? hierarchyCate : [];
        var currentCategory = (hierarchyCate.length > 0) ? hierarchyCate[hierarchyCate.length - 1] : {};
        var pageSeoObject = {
            pagetype: "article",
            seotitle: seoTitle,
            seodescription: seoDescription,
            index: pageContent.allowindex || false,
            follow: pageContent.allowindex || false,
            publishat: (pageContent.publishedat) ? pageContent.publishedat : pageContent.createdAt,
            modifyat: pageContent.updatedAt,
            thumb: imgRectangle,
            icon: imgSquare,
            author: pageContent.author || "0",
            name: pageContent.title,
            category: (hierarchyCate.length > 0) ? hierarchyCate[0].title : "",
            subcategory: currentCategory.title || "",
            notenglish: pageContent.notenglish
        }
        var metaPost = [];
        metaPost = await seometa.postMeta(curLang, req.url, pageSeoObject);
        // SEO schema structure
        var arrSchema = [];
        var person = {
            id: pageContent.Author.id || "0",
            name: pageContent.Author.nickname || pageContent.Author.username || "",
            description: pageContent.Author.nickname || pageContent.Author.username || "",
            avatar: pageContent.Author.avatar || "/assets/imgs/no-image-100.gif"
        };
        arrSchema.push(await schema.Organization(curLang, req.languages, homePage));
        arrSchema.push(await schema.WebSite(curLang));
        arrSchema.push(await schema.Article(curLang, req.url, pageSeoObject));
        arrSchema.push(await schema.Person(curLang, person));
        // SEO breadcumb & pagination
        var hierarchyCate = [];
        hierarchyCate.push({
            slug: `phim/${pageContent.slug}`,
            title: pageContent.title
        });
        var breadcrumbs = await breadcumbController.createBreadcumb(defcateid, curLang, "Tải phim", req.url, res.__("textHome"), hierarchyCate);
        if (breadcrumbs && breadcrumbs.schema) {
            arrSchema.push(breadcrumbs.schema);
        }
        var page = {
            curLang: curLang,
            seoMeta: metaPost.join(""),
            seoSchema: arrSchema.join(","),
            pageContent: pageContent,
            filmRelated: filmRelated,
            cateTL: cateTL,
            cateQG: cateQG,
            cateDV: cateDV,
            cateDD: cateDD,
            cateTags: cateTags,
            breadcrumbs: breadcrumbs
        };
        res.render("web/download-film", { page: page });
    } catch (err) {
        console.log(err);
        return errorController.render500(req, res);
    }
}

// Xử lý tập hợp URL của Xem Phim
async function execDownloadEpisodePage(req, res) {
    try {
        var curLang = req.curLang,
            slug = req.params.slug || "",
            match = slug.match(/\d+$/g),
            id = match[0] || "",
            eslug = req.params.episode || "",
            match2 = eslug.match(/\d+$/g),
            episodeID = match2[0] || "";
        // Lấy thông tin trang HOME
        var pageContent = await postController.getPostByID(id, curLang);
        var episode = await episodeController.getEpisodeById(episodeID);
        episode = (episode) ? episode : {};
        var episodeName = (episode.name) ? functions.getEpisodeName(episode.name) : "";
        var checkSlug = `${req.homeURL}/download/${pageContent.slug}-${id}/${episode.slug}-${episode.id}.html` || "";
        var acceptURL = req.fullURL || "";
        if (pageContent == null || acceptURL == "" || checkSlug != acceptURL) {
            return errorController.render404(req, res);
        }
        var cateTL = [];
        var cateQG = [];
        var cateDV = [];
        var cateDD = [];
        var cateTags = [];
        var cateIDS = [];
        var categories = (pageContent.categories) ? pageContent.categories : [];
        categories.forEach(c => {
            var category = c;
            if (c.catetype == 'category-qg') cateQG.push(category);
            if (c.catetype == 'category-dv') cateDV.push(category);
            if (c.catetype == 'category-dd') cateDD.push(category);
            if (c.catetype == 'tags') cateTags.push(category);
            if (c.catetype == 'category-tl') {
                cateTL.push(category);
                cateIDS.push(category.id);
            }
        });
        // Parse thông tin trang HOME nếu truy cập ngôn ngữ phụ
        pageContent = (!curLang.ismain) ? functions.postMaping(pageContent) : pageContent;
        // Lấy film cùng thể loại updated gần nhất
        var filmRelated = await postController.getPostByCateIdsLangHasSort("updated", cateIDS, [pageContent.id], curLang, 1, 12);

        // SEO Meta tags
        var seoTitle = `Tải ${pageContent.title} ${episodeName}`;
        var seoDescription = `Link tải ${episodeName} phim ${pageContent.title}`;
        var homePage = await postController.getPostBySlug("home", curLang);
        homePage = (!curLang.ismain) ? functions.postMaping(homePage) : homePage;
        var imgRectangle = pageContent.thumb || {};
        var imgSquare = pageContent.icon || {};

        var defcateid = pageContent.dcateid || null;
        if (defcateid == null) { // Đã khai báo category nhưng chưa cập nhật default category ID vào POST
            defcateid = await Category.getCateMinHirarchyLevel(pageContent.id);
            defcateid = (defcateid) ? defcateid : 1; // Nếu chưa khai báo Category cho POST thì cho về 1 = Uncategory
            defcateid = (pageContent.posttype == "post-page") ? null : defcateid; // Nếu chưa khai báo Category cho POST thì cho về 1 = Uncategory
        }
        var hierarchyCate = await Category.findAllParentsSEO(defcateid, curLang.id);
        hierarchyCate = (hierarchyCate) ? hierarchyCate : [];
        var currentCategory = (hierarchyCate.length > 0) ? hierarchyCate[hierarchyCate.length - 1] : {};
        var pageSeoObject = {
            pagetype: "article",
            seotitle: seoTitle,
            seodescription: seoDescription,
            index: pageContent.allowindex || false,
            follow: pageContent.allowindex || false,
            publishat: episode.createdAt,
            modifyat: episode.updatedAt,
            thumb: imgRectangle,
            icon: imgSquare,
            author: pageContent.author || "0",
            name: `${pageContent.title} ${episodeName}`,
            category: (hierarchyCate.length > 0) ? hierarchyCate[0].title : "",
            subcategory: currentCategory.title || "",
            notenglish: pageContent.notenglish
        }
        var metaPost = [];
        metaPost = await seometa.postMeta(curLang, req.url, pageSeoObject);
        // SEO schema structure
        var arrSchema = [];
        var person = {
            id: pageContent.Author.id || "0",
            name: pageContent.Author.nickname || pageContent.Author.username || "",
            description: pageContent.Author.nickname || pageContent.Author.username || "",
            avatar: pageContent.Author.avatar || "/assets/imgs/no-image-100.gif"
        };
        arrSchema.push(await schema.Organization(curLang, req.languages, homePage));
        arrSchema.push(await schema.WebSite(curLang));
        arrSchema.push(await schema.Article(curLang, req.url, pageSeoObject));
        arrSchema.push(await schema.Person(curLang, person));
        // SEO breadcumb & pagination
        var hierarchyCate = [];
        hierarchyCate.push({
            slug: `phim/${pageContent.slug}`,
            title: pageContent.title
        });
        hierarchyCate.push({
            slug: `download/${pageContent.slug}`,
            title: "Tải phim"
        });
        var breadcrumbs = await breadcumbController.createBreadcumb(defcateid, curLang, episodeName, req.url, res.__("textHome"), hierarchyCate);
        if (breadcrumbs && breadcrumbs.schema) {
            arrSchema.push(breadcrumbs.schema);
        }
        var page = {
            curLang: curLang,
            seoMeta: metaPost.join(""),
            seoSchema: arrSchema.join(","),
            pageContent: pageContent,
            filmRelated: filmRelated,
            cateTL: cateTL,
            cateQG: cateQG,
            cateDV: cateDV,
            cateDD: cateDD,
            cateTags: cateTags,
            episode: episode,
            breadcrumbs: breadcrumbs
        };
        res.render("web/download-film-detail", { page: page });
    } catch (err) {
        console.log(err);
        return errorController.render500(req, res);
    }
}