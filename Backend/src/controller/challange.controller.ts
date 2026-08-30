import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware.js";
import { createChallange, getChallenges } from "../services/challange.service.js";


export const createChallangeController = async(
    req:AuthRequest,
    res:Response
) => {

    try {
        
        const challange = await createChallange(
            req.userId!,
            req.body
        )

        res.status(201).json(challange);

    } catch (error) {
        
        res.status(400).json({
            message:(error as Error).message
        });
    }
};


export const getChallengesController = async (
    req: Request,
    res: Response
) => {
    try {
        const challenges = await getChallenges();

        res.status(200).json(challenges);
    } catch (error) {
        res.status(500).json({
            message: (error as Error).message
        });
    }
};