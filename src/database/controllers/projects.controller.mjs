import Project from "../services/projects.services.mjs";
import throwError from "./utils/throwError.mjs";

const projectController = {
  async createProject(req, res, next) {
    const { title, frontendLink, backendLink, description } = req.body;

    try {
      if (!title || !frontendLink){
        throwError(true, "Title and frontend link are required", "Create Project", 400);
      }

      const projectExist = await Project.getProject(title)
      throwError(projectExist, "Project already exist", "Create Project", 400);

      const project = await Project.createProject({ frontendLink, backendLink, description, title })
      
      res.status(201).json(project);
    } catch (error) {
      next(error)
    }
  },
  
  async getProjects(req, res, next) {},

  async getProject(req, res, next) {},

  async updateProject(req, res, next) {},
  
  async deleteProject(req, res, next) {},
   
}

export default projectController;