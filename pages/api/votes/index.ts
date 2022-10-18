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
            }
        })

        return res.json(result)
    }
    else if (req.method === "GET") {
        const result = await prisma.votes.findMany({
            where: {
                publisher: session.user.email
            }
        })
        return res.json(result)
    }

    return res.status(400).json("Method not allowed.")
}
