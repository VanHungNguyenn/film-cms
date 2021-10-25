const express = require("express");
var router = express.Router();
const controller = require("../../controllers/episode.controller");

//router.get("/:pid", controller.List);
router.post("/add", controller.Add);
router.post("/load", controller.Load);
router.post("/bulk", controller.Bulk);
router.post("/edit", controller.Edit);
router.put("/update/coltoggle/:id", controller.UpdateToggleColumn);
router.get("/info/:id", controller.findOne);
router.delete("/delete/:id", controller.Delete);
router.get("/:pid/datatable", controller.DatatableEpisode);

module.exports = router;