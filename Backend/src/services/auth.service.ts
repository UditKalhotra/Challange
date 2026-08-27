import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";

export async function registerUser(
    name:string,
    email:string,
    password:string

){
    const existingUser = await prisma.user.findUnique({
        where:{
            email
        }
    });


    if(existingUser){
        throw new Error("User already exist");
    }

    const hashPassword = await bcrypt.hash(password,10);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashPassword
        }
    });

    const token = generateToken(user.id);

    return {
        user,
        token
    };
}

export async function loginUser(
    email: string,
    password: string
){

    const user = await prisma.user.findUnique({
        where:{
            email
        }
    })

    if(!user){
        throw new Error("Invalid Credential :");
    }

    const passwordMatch = await bcrypt.compare(
        password,
        user.password
    )

    if(!passwordMatch){
        throw new Error("Invalid Credentials");
    }

    const token = generateToken(user.id);

    return{
        user,
        token
    }
    
}