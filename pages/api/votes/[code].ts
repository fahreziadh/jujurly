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

    if (req.method === "GET") {
        const result = await prisma.votes.findFirst({
            where: {
                code: code as string,
                deletedAt: undefined
            }
        })
        return res.json(result)
    }
}