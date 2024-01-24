const authenticateMiddleware = require("../middlewares/validateUser");
const ProjectService = require("../services/Project.Service");
const ProjectRouter = require("express").Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, req.headers.authorization + path.extname(file.originalname));
  },
});
// req.body.id + path.extname(file.originalname).split(".")[1]
const upload = multer({ storage: storage });

ProjectRouter.get("/", ProjectService.getAllProjects) //GetALl projects
  .post("/add", ProjectService.addProject) // To Create a project
  .patch("/", ProjectService.updateProject) //Update Project
  .post("/image", upload.single("file"), (req, res) => {
    //add image
    res.send({
      message: "Success",
    });
  });

module.exports = ProjectRouter;
