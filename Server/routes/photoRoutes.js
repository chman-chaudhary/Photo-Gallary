const { storage } = require("../cloudConfig.js");
const multer = require("multer");
const upload = multer({ storage });
const PhotoController = require("../controller/photoController.js");
const router = require("express").Router();

router.get("/", PhotoController.AllPhotos);
router.post("/upload", upload.single("img"), PhotoController.UploadPhoto);
// router.get("/:id", PhotoController.ShowPhoto);
router.get("/:id", PhotoController.IncreaseViews);

module.exports = router;
