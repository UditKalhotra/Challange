import { Router } from "express";
import { submitChallengeController, getChallengeSubmissionController, reviewSubmissionController } from "../controller/submission.controller.js";
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

router.patch(
    "/challenges/:id/review",
    protect,
    reviewSubmissionController
)

export default router;