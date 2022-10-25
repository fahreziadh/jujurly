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
        const votes = await prisma.votes.findFirst({
            select:{
                id: true,
                publisher: true,
                title: true,
                code: true,
                startDateTime: true,
                endDateTime: true,
                candidates: true,
                createdAt: true,
                deletedAt: false
            },
            where: {
                code: code as string,
                deletedAt: null
            }
        })
       
        // Get Participants of the Vote
        const participants = await prisma.participant.findMany({
            select:{
                candidate:true,
                email: true,
                participateAt: true,
            },
            where: {
                code: code as string,
            }
        })

        //Count Vote for each Candidate
        var candidates : Candidate[] = []; 
        if(participants){
            candidates = votes?.candidates.map(candidate => { 
                const votes = participants.filter(participant => participant.candidate === candidate.name).length || 0;
                return {
                    ...candidate,
                    votes
                }
            }) as Candidate[]
        }

    const result = {
            id: votes?.id,
            publisher: votes?.publisher,
            title: votes?.title,
            code: votes?.code,
            candidates: candidates,
            startDateTime: String(votes?.startDateTime),
            endDateTime: String(votes?.endDateTime),
            createdAt: String(votes?.createdAt),
            totalVotes: candidates ? candidates?.reduce((acc, candidate) => acc + (candidate.votes ? candidate.votes :0), 0) : 0
        } as Votes;

        const response = {
            status: 200,
            data: result,
        }

        return res.json(response)
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