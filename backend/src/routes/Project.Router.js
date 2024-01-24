const authenticateMiddleware = require("../middlewares/validateUser");
const ProjectService = require("../services/Project.Service");
const ProjectRouter = require("express").Router();

ProjectRouter.get("/", ProjectService.getAllProjects).post(
  "/add",
  ProjectService.addProject
); // To Create a project

module.exports = ProjectRouter;
