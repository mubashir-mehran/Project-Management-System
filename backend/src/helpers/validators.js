const yup = require("yup");

const userValidator = yup.object({
  fullName: yup.string().required("Full Name is Requried"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const projectValidator = yup.object({
  projectName: yup
    .string()
    .required("Project name is required")
    .trim()
    .min(3, "Project name must be at least 3 characters")
    .max(50, "Project name is too long"),
  description: yup.string().required("Description is required"),
  startDate: yup
    .date()
    // .required("Start date is required")
    .min(new Date(), "Start date must be in the future"),
  techStacks: yup.array().of(yup.string().required("Tech stack is required")),
  githubRepoLink: yup.string().url("Invalid URL format for GitHub repo link"),
  liveUrl: yup.string().url("Invalid URL format for live URL"),
  type: yup.string().required("Project type is required"),
});

module.exports = { userValidator, projectValidator };
