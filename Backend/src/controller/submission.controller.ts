import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware.js";
import { submitChallenge, getChallengeSubmission } from "../services/submission.service.js";

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

export const getChallengeSubmissionController = async(
    req: AuthRequest,
    res: Response 
) => {

    try {

        const userId = req.userId!;
        const challengeId = String(req.params.id);

        const submission = await getChallengeSubmission(userId, challengeId);

        return res.status(200).json({
            message: "Submission successfully fetched : ",
            submission
        });
        
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }


}