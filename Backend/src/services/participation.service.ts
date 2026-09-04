import prisma from "../config/prisma.js";

export const joinChallange = async(
    userId: string,
    challengeId: string
) => {

    const challenge = await prisma.challenge.findUnique({
        where:{
            id: challengeId
        }
    });

    if(!challenge){
        throw new Error("Challenge not found :");
    }

    if(challenge.status !== "OPEN"){
        throw new Error("Challenge is open for joining");
    }

    const existingParticipation = await prisma.participation.findUnique({
        where:{
            userId_challengeId:{
                userId,
                challengeId
            }
        }
    });

    if(existingParticipation){
        throw new Error("You have already joined this challenge");
    }

    const participation = await prisma.participation.create({
        data:{
            userId,
            challengeId
        }
    });

    return participation;
}