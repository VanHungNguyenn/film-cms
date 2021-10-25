const express = require("express");
const { checkRole } = require('../../middleware/checkRole');
const errorController = require('../../controllers/error.controller');
const { countPostWithType } = require('../../controllers/post.controller');
const { countEpisode } = require('../../controllers/episode.controller');
var router = express.Router();
// Hien thi trang Dashboard
router.get("/", async(req, res) => {
    try{
        var numFilm = await countPostWithType('post-film');
        var numEpisode = await countEpisode();
        return res.render("admin", {numFilm, numEpisode});
    }catch(err){
        return errorController.render500(req, res);
    }
});
// Cac trang khac cua admin chiu anh huong cua phan quyen
router.use("/post", checkRole("post"), require("./post.routes.js"));
router.use("/category", checkRole("category"), require("./category.routes.js"));
router.use("/media", checkRole("media"), require("./media.routes.js"));
router.use("/feedback", checkRole("feedback"), require("./feedback.routes.js"));
router.use("/language", checkRole("language"), require("./language.routes.js"));
router.use("/type", checkRole("type"), require("./type.routes.js"));
router.use("/sitefeature", checkRole("sitefeature"), require("./sitefeature.routes.js"));
router.use("/menu", checkRole("menu"), require("./menu.routes.js"));
router.use("/option", checkRole("option"), require("./option.routes.js"));
router.use("/user", checkRole("user"), require("./user.routes.js"));
router.use("/role", checkRole("role"), require("./role.routes.js"));
router.use("/rolefeature", checkRole("rolefeature"), require("./rolefeature.routes.js"));
router.use("/userui", require("./userui.routes.js"));
router.use("/server", checkRole("server"), require("./server.routes.js"));
router.use("/episode", checkRole("episode"), require("./episode.routes.js"));

module.exports = router;