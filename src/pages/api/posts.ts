import { NextApiRequest, NextApiResponse } from "next";
// import { getAllPosts } from "../../prisma";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // const posts = await getAllPosts()
  const posts = await prisma.post.findMany({ include: { author: true } })

  res.status(200).json({ posts })
}