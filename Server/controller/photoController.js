const Photo = require("../Models/photo.js");
const User = require("../Models/user.js");
const jwt = require("jsonwebtoken");

module.exports.AllPhotos = async (req, res) => {
  try {
    const allPhotos = await Photo.find({});
    res.status(200).json(allPhotos);
  } catch (error) {
    console.error("Error in finding photos:", error);
  }
};

module.exports.UploadPhoto = async (req, res) => {
  let url = 0;
  if (typeof req.file !== "undefined") {
    url = req.file.path;
  }
  if (!req.cookies.token)
    return res
      .status(500)
      .json({ message: "Please Login", success: false, isLogin: false });
  let cookieData = jwt.verify(req.cookies.token, process.env.TOKEN_KEY);
  const userId = cookieData.id;
  const user = await User.findById(userId);
  if (!user || !userId)
    return res
      .status(500)
      .json({ message: "Please Login", success: false, isLogin: false });
  let newPhoto = new Photo({ ...req.body });
  if (url) {
    newPhoto.url = url;
  }
  const photo = await newPhoto.save();
  if (photo) res.status(200).json({ success: true, photo });
  else res.status(400).json({ success: false });
};

module.exports.IncreaseViews = async (req, res) => {
  try {
    let { id } = req.params;
    let oldPhoto = await Photo.findById(id);
    let photo = await Photo.findByIdAndUpdate(id, {
      views: oldPhoto.views ? oldPhoto.views + 1 : 1,
    });
    if (photo) res.status(200).json({ success: true, views: photo.views });
    else res.status(400).json({ success: false, message: "Photo not found" });
  } catch (error) {
    res.status(500).json({ message: "Bad Request", success: false });
  }
};
