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