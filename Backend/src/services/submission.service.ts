import prisma from "../config/prisma.js";
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