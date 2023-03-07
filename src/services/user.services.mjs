import User from '../models/User.model.mjs'
import queryAbstraction from './mongoose.services.mjs'

const UserClass = {
	createUser(user) {		
		return queryAbstraction.create(User, user)
	},

	findOne(username, email) {
		return queryAbstraction.getOne(User, { $or: [{ username }, { email }] })
	},

	deleteUsers() {
		return queryAbstraction.deleteMany(User) 
	},
}

export default UserClass
