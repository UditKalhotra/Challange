import { Router } from "express";
import { submitChallengeController } from "../controller/submission.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.post(
    "/challenges/:id/submit",
    protect,
    submitChallengeController
);

export default router;