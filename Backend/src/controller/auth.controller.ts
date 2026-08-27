import type { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service.js";

export const register = async(
    req: Request, 
    res: Response ) => {
    try {

        const {name, email, password} = req.body;

        const result = await registerUser(name,email,password);

        res.status(201).json(result);
        
    } catch (error) {
        res.status(400).json({
            message: (error as Error).message
        });
    }
}

export const login = async(req: Request, res: Response) => {

     try {

        const {email,password} = req.body;


        const result = await loginUser(
            email,
            password
        );


        res.status(200).json(result);


    } catch(error){

        res.status(400).json({
            message:(error as Error).message
        });

    }

}