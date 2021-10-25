const express = require("express");
var router = express.Router();
const controller = require("../../controllers/post.controller");
const { ListEpisode } = require("../../controllers/episode.controller");

router.get("/post-film/:pid/episode", ListEpisode);
router.get("/:posttype", controller.ListPost);
router.get("/:posttype/add", controller.GetAddPost);
router.post("/:posttype/add", controller.AddPost);
router.post("/:posttype/bulk", controller.BulkPost);
router.use("/:posttype/lang", require("./postlang.routes"));
router.put("/:posttype/update/coltoggle/:id", controller.UpdateToggleColumn);
router.get("/:posttype/edit/:id", controller.GetEditPost);
router.post("/:posttype/edit/:id", controller.EditPost);
router.get("/post-film/datatable", controller.DatatableFilm);
router.get("/:posttype/datatable", controller.Datatable);

module.exports = router;