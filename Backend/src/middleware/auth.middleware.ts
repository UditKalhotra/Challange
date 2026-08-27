import type {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
    userId?: string;
};

export const protect = async(
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {

    try {

        const authHeader = req.headers.authorization;

        if(!authHeader){
            return res.status(401).json({
                message: "No token Provided"
            });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
             message: "Malformed token",
            });
}

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as {
            userId:string
        };

        console.log(decoded);
        req.userId = decoded.userId;

        next();


    } catch (error) {
        
        return res.status(401).json({
            message:"Invalid token"
        });
    }
}