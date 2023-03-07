import { Router } from 'express'

import authRoutes from '../src/routes/user.routes.mjs'
import projectRoutes from '../src/routes/project.routes.mjs'
import emailRoutes from '../src/routes/email.routes.mjs'
import notFound from './routes/not-found.mjs'
import fileUpload from './configs/cloudinary.mjs'

const router = Router()

router.get('/health', (_, res) => res.status(200).json({ Message: 'Ok' }))

router.use('/auth', authRoutes)

router.use('/projects', projectRoutes)

router.use('/email', emailRoutes)

router.post('/tets', fileUpload.single('image'), (req, res) => {
	let file = req.file ? req.file.path : undefined
	res.status(200).json({ message: file })
})

router.use(notFound)


router.use((error, req, res, _) => {
	console.log(`ERROR: ${error.message} in ${req.method} ${req.path}`)
	console.log(error)
	res.status(error.status || 500).json({ message: error.message, place: error.place })
})

export default router
