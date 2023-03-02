import { Router } from "express";

import projectController from "../database/controllers/projects.controller.mjs";
import { verifyToken } from "../database/controllers/utils/tokenHandler.mjs";
import { isOwner } from "../middleware/isOwner.mjs";

const router = Router();

router.post('/', verifyToken, isOwner ,projectController.createProject);

router.get('/', projectController.getProjects);

router.get('/:projectId', projectController.getProject);

router.put('/:projectId', verifyToken, projectController.updateProject);

router.delete('/:projectId', verifyToken, projectController.deleteProject);

export default router;