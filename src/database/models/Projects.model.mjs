import createSchema from "./modelGenerator.mjs";

const projectSchema = {
  title: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  frontendLink: {
    type: String,
    required: true,
    trim: true,
  },
  backendLink: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  isHighlight:{ 
    type: Boolean,
    default: false,
  },
  techStack: {
    type: [String],
  }

}

export default createSchema(projectSchema, 'Project')