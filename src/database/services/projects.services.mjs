import Projects from '../models/Projects.model.mjs'
import queryAbstraction from './mongoose.services.mjs'

const ProjectClass = {
	createProject(project) {
		return queryAbstraction.create(Projects, project)   
	},

	deleteProject(id) {
		return queryAbstraction.deleteById(Projects, id)
	},

	updateProject(id, project) {
		return queryAbstraction.updateById(Projects, id, project, { new: true })
	},

	getProject(title) {
		return queryAbstraction.getOne(Projects, { title })
	},

	getAllProjects() {
		return queryAbstraction.getAll(Projects)

	},
}

export default ProjectClass
