import Projects from '../models/Projects.model.mjs'

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

	getProject(id) {
		return Projects.findById(id)
	},

	getAllProjects() {
		return Projects.find()
	},
}

export default ProjectClass
