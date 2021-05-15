import { PrismaClient } from ".prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "../../lib/middleware";

async function post(uid: string, body: any, res: NextApiResponse) {
  const prisma = new PrismaClient()

  const comment = await prisma.comment.create({
    data: {
      content: body.content,
      author: {
        connect: { uid: uid }
      },
      post: {
        connect: { id: body.post }
      }
    }
  })

  res.status(201).json({ comment })
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  const uid = req.headers.authorization as string

  switch (req.method) {
    case 'POST':
      post(uid, req.body, res)
      break;
    default:
      res.status(405).json({ message: 'Invalid Method'})
      break;
  }

}

export default withAuth(handler)