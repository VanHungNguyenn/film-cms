const express = require("express");
var router = express.Router();
const fs = require("fs");
const sitemapController = require("../../controllers/seo.sitemap.controller");
const webController = require("../../controllers/web.controller");
// Icon site
router.get("/favicon.ico", (req, res) => res.status(204).end());
router.get("/main-sitemap.xsl", function (req, res) {
  fs.ReadStream("./main-sitemap.xsl").pipe(res);
});
// Ajax rating, vote, view count
router.use("/interactive", require("./interactive.routes.js"));
router.use("/:langid/interactive", require("./interactive.routes.js"));
// Contact
router.use("/feedback", require("./feedback.routes.js"));
// Sitemap
router.get("/sitemap.xml", sitemapController.getMain);
router.get("/:type-sitemap.xml", sitemapController.getDetail);
router.get("/:type-sitemap:page.xml", sitemapController.getDetail);
// Trang chủ
router.get("/", webController.homePage);
// Trang Danh mục
router.get("/search/", webController.searchPage);
router.get("/:slug", webController.categoryPage);
// Trang phim
router.get("/movie/:slug", webController.phimPage);
router.get("/movie/:slug/:episode.html", webController.watchPage);
router.get("/download/:slug", webController.downloadPage);
router.get("/download/:slug/:episode.html", webController.downloadEpisodePage);
module.exports = router;
