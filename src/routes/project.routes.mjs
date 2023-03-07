import { Router } from "express";

import projectController from "../controllers/projects.controller.mjs";
import { verifyToken } from "../utils/tokenHandler.mjs";
import { isOwner } from "../middleware/isOwner.mjs";

const router = Router();

router.post('/', verifyToken, isOwner ,projectController.createProject);

router.get('/', projectController.getProjects);

router.get('/:projectId', projectController.getProject);

router.put('/:projectId', verifyToken, isOwner, projectController.updateProject);

router.delete('/:projectId', verifyToken, isOwner, projectController.deleteProject);

export default router;