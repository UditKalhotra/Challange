import type {Response} from "express";
import type { AuthRequest } from "../middleware/auth.middleware.js";
import { joinChallange } from "../services/participation.service.js";

export const joinChallengeController = async(
    req: AuthRequest,
    res: Response
) => {

    try {
        const userId = req.userId!;
        const challengeId = String(req.params.id);

        const participation = await joinChallange(userId, challengeId);

        res.status(201).json({
            message:"Successfully Joined Challaneg :",
            participation
        })

        
    } catch (error) {
        res.status(500).json({
            message: (error as Error).message
        });
    }
}