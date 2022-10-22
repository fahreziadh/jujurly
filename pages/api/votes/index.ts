import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import { code } from "../../../lib/code";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const session = await unstable_getServerSession(req, res, authOptions)

    if (!session) {
        res.status(401).json({ message: "You must be logged in." });
        return;
    }

    // Create New Votes
    if (req.method === "POST") {
        const result = await prisma.votes.create({
            data: {
                candidates: req.body.candidates,
                endDateTime: req.body.endDate,
                startDateTime: req.body.startDate,
                title: req.body.title,
                voters: undefined,
                publisher: req.body.publisher,
                code: code(6),
                deletedAt: undefined,
            }
        })

        return res.json(result)
    }

    // Get All Votes by User
    else if (req.method === "GET") {
        const result = await prisma.votes.findMany({
            where: {
                publisher: session.user.email,
                deletedAt: undefined
            }
        })
        return res.json(result)
    }

    // Update Votes
    else if (req.method === "PUT") {
        const result = await prisma.votes.update({
            where: {
                code: req.body.code
            },
            data: {
                candidates: req.body.candidates,
                endDateTime: req.body.endDate,
                startDateTime: req.body.startDate,
                title: req.body.title,
            }
        })

        return res.json(result)
    }

    return res.status(400).json("Method not allowed.")
}
