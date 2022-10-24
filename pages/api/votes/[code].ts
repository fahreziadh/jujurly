import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]"
import { prisma } from "../../../lib/prisma";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const session = await unstable_getServerSession(req, res, authOptions)

    if (!session) {
        res.status(401).json({ message: "You must be logged in." });
        return;
    }

    const { code } = req.query;

    // Get Details of the Vote
    if (req.method === "GET") {
        const result = await prisma.votes.findFirst({
            select:{
                id: true,
                publisher: true,
                title: true,
                code: true,
                startDateTime: true,
                endDateTime: true,
                candidates: true,
                createdAt: true,
                participants: false,
                deletedAt: false
            },
            where: {
                code: code as string,
                deletedAt: null
            }
        })
        return res.json(result)
    }

    // Delete the Vote
    if (req.method === "DELETE") {
        const result = await prisma.votes.update({
            where: {
                code: code as string
            },
            data: {
                deletedAt: new Date().toString()
            }
        })
        return res.json(result)
    }

}