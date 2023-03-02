import Project from '../services/projects.services.mjs'
import inputChecker from './utils/inputChecker.mjs'
import throwError from './utils/throwError.mjs'

const projectController = {
	async createProject(req, res, next) {
		const { title, frontendLink, backendLink, description, isHighlight, techStack } = req.body

		try {
			if (!title || !frontendLink) {
				throwError(true, 'Title and frontend link are required', 'Create Project', 400)
			}

			const urlRegex = inputChecker.url(frontendLink)
			throwError(!urlRegex, 'Invalid frontend link', 'Create Project', 400)

			if (backendLink) {
				const urlRegex = inputChecker.url(backendLink)
				throwError(!urlRegex, 'Invalid backend link', 'Create Project', 400)
			}

			const projectExist = await Project.getProject(title)
			throwError(projectExist, 'Project already exist', 'Create Project', 400)

			const project = await Project.create(ProjectsModel, { frontendLink, backendLink, description, title, isHighlight, techStack })

			res.status(201).json(project)
		} catch (error) {
			next(error)
		}
	},

	async getProjects(req, res, next) {
		try {
			const projects = await Project.getAllProjects()

			return res.status(200).json(projects)
		} catch (error) {
			next(error)
		}
	},

	async getProject(req, res, next) {},

	async updateProject(req, res, next) {},

	async deleteProject(req, res, next) {},
}

export default projectController
