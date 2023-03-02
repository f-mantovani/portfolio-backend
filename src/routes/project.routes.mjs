import { Router } from "express";

import projectController from "../database/controllers/projects.controller.mjs";
import { verifyToken } from "../database/controllers/utils/tokenHandler.mjs";

const router = Router();

router.post('/', verifyToken, projectController.createProject);

router.get('/', projectController.getProjects);

router.get('/:projectId', projectController.getProject);

router.put('/:projectId', verifyToken, projectController.updateProject);

export default router;