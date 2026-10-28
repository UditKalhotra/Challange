import prisma from "../config/prisma.js";
import type { SubmissionStatus } from "../generated/prisma/client.js";



export const submitChallenge = async (
    userId: string,
    challengeId: string,
    proofUrl: string
) => {

    // Check if challenge exists
    const challenge = await prisma.challenge.findUnique({
        where: {
            id: challengeId
        }
    });

    if (!challenge) {
        throw new Error("Challenge not found");
    }

    // Check deadline
    if (new Date() > challenge.deadline) {
        throw new Error("Challenge deadline has passed");
    }

    // Check if user has joined the challenge
    const participation = await prisma.participation.findUnique({
        where: {
            userId_challengeId: {
                userId,
                challengeId
            }
        }
    });

    if (!participation) {
        throw new Error("You must join the challenge before submitting");
    }

    // Create submission
    const submission = await prisma.submission.create({
        data: {
            userId,
            challengeId,
            proofUrl
        }
    });

    return submission;
};

export const getChallengeSubmission = async(
    userId: string,
    challengeId: string
) => {

    const challenge = await prisma.challenge.findUnique({
        where: {
            id: challengeId
        },

        select: {
            id: true,
            creatorId: true
        }
    });

    if(!challenge){
        throw new Error("challenge not found");
    }

    if(challenge.creatorId !== userId){
        throw new Error("Only the challenge creatoe can view submission :");
    }

    const submission = await prisma.submission.findMany({
        where: {
            challengeId
        },
        include: {
            user : {
                select: {
                    id: true,
                    name: true
                }
            }
        },
        orderBy: {
            submittedAt: "desc"
        }
    });

    return submission;
}


export const reviewSubmission = async(
    reviewId: string,
    submissionId: string,
    status: SubmissionStatus
) => {

    const submission = await prisma.submission.findUnique({
        where: {
            id: submissionId
        },
        include: {
            challenge:{
                select: {
                    creatorId: true
                }
            }
        }
    });

    if(!submission){
        throw new Error("Submission not found :");
    }

    if(submission.challenge.creatorId !== reviewId){
        throw new Error("only the challenge reviewer can review submission");
    }

    if(submission.status !== "PENDING"){
        throw new Error("Submission has already been reviewed ");
    }

    return prisma.submission.update({
        where:{
            id: submissionId
        },
        data: {
            status
        }
    })

}
