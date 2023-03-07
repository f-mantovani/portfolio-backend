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
		return queryAbstraction.updateById(Projects, id, project, { runValidators: true })
	},

	getProject(filter) {
		return queryAbstraction.getOne(Projects,  filter)
	},

	getAllProjects() {
		return queryAbstraction.getAll(Projects)
	},
}

export default ProjectClass
