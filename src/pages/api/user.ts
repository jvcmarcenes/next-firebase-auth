import { NextApiRequest, NextApiResponse } from "next";

import prisma from '../../prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  switch (req.method) {
    case 'POST':
      await createUser(req.body, res)
      break
    default:
      res.status(205).json({ message: 'Invalid Method' })
      break
  }
}

async function createUser(body: any, res: NextApiResponse) {

  console.log(body)

  let user = await prisma.user.findUnique({
    where: { 
      uid: body.uid
    }
  })

  if (user) return res.status(200).json({ user })

  user = await prisma.user.create({
    data: {
      uid: body.uid,
      email: body.email,
      name: body.name,
      provider: body.provider,
      photoUrl: body.photoUrl,
    }
  })

  res.status(201).json({ user })
}