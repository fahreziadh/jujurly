import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "../../../lib/prisma";

export default async function handle(req:NextApiRequest, res:NextApiResponse) {
    const session = await unstable_getServerSession(req, res, authOptions)

    if (!session) {
        res.status(401).json({ message: "You must be logged in." });
        return;
    }
    const { code } = req.query;

    // Get Participant Details  
    if (req.method === "GET") {
        const result = await prisma.participant.findFirst({
            where: {
                    code: code as string,
                    email: session.user.email
                }
        })
        const response = {
            status: 200,
            data: result,
        }
        return res.status(200).json(response)
    }

    // Add Participant
    if (req.method === "POST") {
        const result = await prisma.participant.create({
            data: {
                   candidate: req.body.candidate,
                   email: session.user.email,
                   code: code as string
            }
        })
        return res.json(result)
    }

    return res.json({ message: "Hi" })
}