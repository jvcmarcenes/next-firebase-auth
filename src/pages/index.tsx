import { PrismaClient } from ".prisma/client"
import { GetServerSideProps } from "next"
import { useAuth } from "../components/Auth"
import PostView from '../components/PostView'
import { server } from "../config"

interface Props {
  posts: any
}

export default function Home({ posts }: Props) {

  const { user, loading } = useAuth()

  if (loading) return <> 
    <p>Loading...</p>
  </>

  return <> 
    <p>Hello</p>
    <PostView posts={posts} />
  </>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // const res = await fetch(`${server}/api/posts`, { method: 'GET' })
  // const posts = await res.json()

  const prisma = new PrismaClient()
  const posts = await prisma.post.findMany({ include: { author: true } })

  return {
    props: { posts }
  }
}
