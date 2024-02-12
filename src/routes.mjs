import { Router } from 'express';

import authRoutes from '../src/routes/user.routes.mjs';
import projectRoutes from '../src/routes/project.routes.mjs';
import emailRoutes from '../src/routes/email.routes.mjs';
import imageRoutes from '../src/routes/image.routes.mjs';
import notFound from './routes/not-found.mjs';
import ProjectClass from './services/projects.services.mjs';

const router = Router();

router.get('/keep-alive', async (_, res) => {
	try {
		await ProjectClass.getAllProjects();
		res.status(200).json({ message: 'It worked' });
	} catch (error) {
		res.status(500).json({ message: "It didn't work" });
	}
});

router.use('/auth', authRoutes);

router.use('/projects', projectRoutes);

router.use('/email', emailRoutes);

router.use('/upload', imageRoutes);

router.use(notFound);

router.use((error, req, res, _) => {
	console.log(`ERROR: ${error.message} in ${req.method} ${req.path}`);
	console.log(error);
	res.status(error.status || 500).json({ message: error.message, place: error.place });
});

export default router;
