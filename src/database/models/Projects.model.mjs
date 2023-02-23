import createSchema from "./modelGenerator.mjs";

const projectSchema = {
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  frontendLink: {
    type: String,
    required: true,
    trim: true,
  },
  backendLink: {
    type: String,
    trim: true,
  }
}


export default createSchema(projectSchema, 'Project')