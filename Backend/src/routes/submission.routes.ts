import { Router } from "express";
import { submitChallengeController, getChallengeSubmissionController } from "../controller/submission.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.post(
    "/challenges/:id/submit",
    protect,
    submitChallengeController
);

router.get(
    "/challenges/:id/submission",
    protect,
    getChallengeSubmissionController
)

export default router;