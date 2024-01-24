const asyncHandler = require("express-async-handler");
const ProjectController = require("../controllers/Project.Controller");
const globalServices = require("../helpers/globalServices");

// To add a project

const addProject = async (req, res) => {
  try {
    const response = await ProjectController.addProject(req.body);
    globalServices.successResponse(res, response);
  } catch (error) {
    globalServices.addStatusCodeWithError(error, res);
  }
};

// To get all projects
const getAllProjects = async (req, res) => {
  try {
    console.log(req.query);
    const response = await ProjectController.getAllProjects(req.query);
    globalServices.successResponse(res, response);
  } catch (error) {
    globalServices.addStatusCodeWithError(error, res);
  }
};

// To get project by id
const getProjectById = async (req, res) => {
  try {
    const response = await ProjectController.addProject(req.body);
    globalServices.successResponse(res, response);
  } catch (error) {
    globalServices.addStatusCodeWithError(error, res);
  }
};

// To delete a project
const deleteProject = async (req, res) => {
  try {
    const response = await ProjectController.addProject(req.body);
    globalServices.successResponse(res, response);
  } catch (error) {
    globalServices.addStatusCodeWithError(error, res);
  }
};

// To update a project
const updateProject = async (req, res) => {
  try {
    const response = await ProjectController.updateProject(
      req.query.id,
      req.body
    );
    globalServices.successResponse(res, response);
    req;
  } catch (error) {
    globalServices.addStatusCodeWithError(error, res);
  }
};

const ProjectService = { addProject, getAllProjects, updateProject };

module.exports = ProjectService;
