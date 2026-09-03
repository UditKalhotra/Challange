import type { Request,Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware.js";
import { createChallange, getChallenges,getChallengeById,deleteChallenge } from "../services/challange.service.js";


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

export const getSpecficChallenge = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const challenge = await getChallengeById(id as string);

        res.status(200).json({
            message: "Challenge fetched successfully",
            challenge
        });
    } catch (error) {
        res.status(404).json({
            message: "Challenge not found"
        });
    }
};

export const removeChallenge = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;

        await deleteChallenge(id as string, req.userId!);

        res.status(200).json({
            message: "Challenge deleted successfully"
        });
    } catch (error) {
        res.status(404).json({
            message: "Challenge not found please try again :"
        });
    }
};
