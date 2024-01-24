const globalServices = require("../helpers/globalServices");
const { getJwtToken } = require("../helpers/jwtServices");
const { projectValidator } = require("../helpers/validators");
const ProjectModel = require("../models/Project.Model");

// To create a project
const addProject = async (projectBody) => {
  await projectValidator.validate(projectBody);

  const projectExists = await ProjectModel.findOne({
    projectName: projectBody.projectName,
  });
  if (projectExists)
    globalServices.throwCustomError(
      "ProjectName Already Exists! Choose another one",
      404
    );
  return await ProjectModel.create(projectBody);
};

// To get all projects
const getAllProjects = async ({
  sortByName, // "az" "za"
  sortByDate, // newest oldest
  search, // projectA
  techStacks, //
  type, // completed achieved current
}) => {
  let query = {};
  let sort = {};

  // Sorting By Name
  if (sortByName == "az") {
    sort = { ...sort, projectName: 1 };
  } else if (sortByName == "za") {
    sort = { ...sort, projectName: -1 };
  }

  //Sorting By StartDate

  if (sortByDate == "newest") {
    sort = { ...sort, startDate: -1 };
  } else if (sortByDate == "oldest") {
    sort = { ...sort, startDate: 1 };
  }

  // Searching by name
  if (search) {
    query = {
      ...query,
      projectName: { $regex: new RegExp(search, "i") },
    };
  }

  // Filtering by tech stacks
  if (techStacks) {
    query = { ...query, techStacks: { $in: techStacks } };
  }

  //Filtering by type
  if (type) {
    query = { ...query, type };
  }

  const projects = await ProjectModel.find(query).sort(sort);
  return projects;
};

// To update project
const updateProject = async (id, projectBody) => {
  const response = await ProjectModel.findOneAndUpdate(
    {
      _id: id,
    },
    {
      ...projectBody,
    }
  );
  return response;
};

const ProjectController = { addProject, getAllProjects, updateProject };

module.exports = ProjectController;
