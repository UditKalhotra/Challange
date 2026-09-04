import { Router } from "express";
import { joinChallengeController } from "../controller/participation.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/challenge/:id/join", protect, joinChallengeController);

export default router;