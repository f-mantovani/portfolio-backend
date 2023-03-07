import Project from '../services/projects.services.mjs'
import inputChecker from '../utils/inputChecker.mjs'
import throwError from '../utils/throwError.mjs'

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
				const backendRegex = inputChecker.url(backendLink)
				throwError(!backendRegex, 'Invalid backend link', 'Create Project', 400)
			}

			const projectExist = await Project.getProject({title})
			throwError(projectExist, 'Project already exist', 'Create Project', 400)

			const newProject = { frontendLink, backendLink, description, title, isHighlight, techStack }

			const project = await Project.createProject(newProject) 

			res.status(201).json(project)
		} catch (error) {
			next(error)
		}
	},

	async getProjects(_, res, next) {
		try {
			const projects = await Project.getAllProjects()

			return res.status(200).json(projects)
		} catch (error) {
			error.place = 'Get all projects'
			next(error)
		}
	},

	async getProject(req, res, next) {
		const { projectId } = req.params
		try {
			const project = await Project.getProject({projectId})

			return res.status(200).json(project)
		} catch (error) {
			error.place = 'Get one project'
			next(error)
		}
	},

	async updateProject(req, res, next) {
		const { projectId } = req.params

		const { title, frontendLink, backendLink, description, isHighlight, techStack } = req.body

		try {
			if (!title || !frontendLink) {
				throwError(true, 'Title and frontend link are required', 'Update Project', 400)
			}

			const urlRegex = inputChecker.url(frontendLink)
			throwError(!urlRegex, 'Invalid frontend link', 'Create Project', 400)

			if (backendLink) {
				const backendRegex = inputChecker.url(backendLink)
				throwError(!backendRegex, 'Invalid backend link', 'Create Project', 400)
			}

			const toUpdateProject = {
				title,
				frontendLink,
				backendLink,
				description,
				isHighlight,
				techStack,
			}

			const updatedProject = await Project.updateProject(projectId, toUpdateProject)

			return res.status(200).json(updatedProject)
		} catch (error) {
			if (error.code === 11000) {
				error.message = 'Project title already exist'
			}
			error.place = 'Update project'
			next(error)
		}
	},

	async deleteProject(req, res, next) {
		const { projectId } = req.params
		try {
      await Project.deleteProject(projectId)

			return res.status(204).json()
		} catch (error) {
			error.place = 'Delete project'
      next(error)
		}
	},
}

export default projectController
