import { PrismaClient } from ".prisma/client";

const prisma = new PrismaClient()

// export default prisma

export async function getAllPosts() {
  return await prisma.post.findMany({ include: { author: true } })
}