import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware.js";
import { submitChallenge } from "../services/submission.service.js";

export const submitChallengeController = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const userId = req.userId!;
        const challengeId = String(req.params.id);
        const { proofUrl } = req.body;

        if (!proofUrl) {
            return res.status(400).json({
                message: "Proof URL is required"
            });
        }

        const submission = await submitChallenge(
            userId,
            challengeId,
            proofUrl
        );

        res.status(201).json({
            message: "Challenge submitted successfully",
            submission
        });

    } catch (error) {

        const message =
            error instanceof Error
                ? error.message
                : "Something went wrong";

        res.status(400).json({
            message
        });
    }
};