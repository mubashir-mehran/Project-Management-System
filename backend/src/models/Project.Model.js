const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    default: new Date(),
  },
  image: {
    type: String,
  },
  techStacks: {
    type: [String],
    required: true,
  },
  githubRepoLink: {
    type: String,
  },
  liveUrl: {
    type: String,
  },
  type: {
    type: String,
    enum: ["completed", "archived", "current"],
    required: true,
  },
});

const ProjectModel = mongoose.model("project", ProjectSchema);

module.exports = ProjectModel;
