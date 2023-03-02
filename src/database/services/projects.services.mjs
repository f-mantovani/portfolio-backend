import Projects from '../models/Projects.model.mjs'
import queryAbstraction from './mongoose.services.mjs'

const ProjectClass = {
	createProject(project) {
		return Projects.create(project)
	},

	deleteProject(id) {
		return Projects.findByIdAndDelete(id)
	},

	updateProject(id, project) {
		return Projects.findByIdAndUpdate(id, project, { new: true })
	},

	getProject(title) {
		return Projects.findOne({ title })
	},

	getAllProjects() {
		return queryAbstraction.getAll(Projects).select('-_id title')

	},
}

export default ProjectClass
