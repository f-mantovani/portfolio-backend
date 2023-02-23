import { Router } from "express";

import projectController from "../database/controllers/projects.controller.mjs";
import { verifyToken } from "../database/controllers/utils/tokenHandler.mjs";

const router = Router();

router.post('/', verifyToken, projectController.createProject);

export default router;