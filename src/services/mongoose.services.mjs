const queryAbstraction = {
  create(model, create){
		return model.create(create)
	},
  
  getOne(model, filter) {
    return model.findOne(filter, {}, { lean: true })
  },

  getAll(model) {
    return model.find()
  },

	updateById(model, id, update, options) {
    return model.findByIdAndUpdate(id, update, {...options, new: true, lean: true })
	},

  deleteById(model, id) {
    return model.findByIdAndDelete(id)
  },

  deleteMany(model, filter){
    return model.deleteMany(filter)
  }

}

export default queryAbstraction