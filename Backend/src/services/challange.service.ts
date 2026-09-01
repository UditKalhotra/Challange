import prisma from "../config/prisma.js";

export const createChallange = async (
    userId:string,
    data:{
        title:string,
        description:string,
        category:string,
        deadline:Date
    }
) => {

    const challange = await prisma.challenge.create({

        data:{
            title:data.title,
            description: data.description,
            category:data.category,
            deadline:data.deadline,

            creatorId:userId


        }
    });

    return challange;
}

export const getChallenges = async () => {
    const challenges = await prisma.challenge.findMany({
        orderBy: {
            createdAt: "desc"
        }
    });

    return challenges;
};


export const getChallengeById = async(id: string) => {

    const challenge = await prisma.challenge.findUnique({
        where: {
            id: id
        }
    });

    if(!challenge){
        throw new Error("Challenge Not found :");
    }

    return challenge;
};


export const deleteChallenge = async (
    id: string,
    userId: string
 ) => {

    const challenge = await prisma.challenge.findUnique({
        where: {
            id
        }
    });

    if (!challenge) {
        throw new Error("Challenge not found");
    }

    if (challenge.creatorId !== userId) {
        throw new Error("You are not allowed to delete this challenge");
    }

    await prisma.challenge.delete({
        where: {
            id
        }
    });
};