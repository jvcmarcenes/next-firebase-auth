import { PrismaClient } from ".prisma/client"
import { GetServerSideProps } from "next"
import { useState } from "react"
import { useAuth } from "../components/Auth"
import PostView from '../components/PostView'
import { server } from "../config"

interface Props {
  posts: any
}

export default function Home({ posts }: Props) {

  const { user, loading } = useAuth()

  // if (loading) return <> 
  //   <p>Loading...</p>
  // </>

  const [ res, setRes ] = useState<any>({})

  async function makeRequest() {
    const res = await fetch(`${server}/api/user`, { headers: user ? { authorization: user.uid } : { } })
    const data = await res.json()

    setRes(data)
  }

  return <> 
    <button onClick={() => makeRequest()}> make request </button>
    <pre> {JSON.stringify(res)} </pre>
    <p> Hello </p>
    <PostView posts={posts} />
  </>
}

export const getServerSideProps: GetServerSideProps = async () => {
  // const res = await fetch(`${server}/api/posts`, { method: 'GET' })
  // const posts = await res.json()

  const prisma = new PrismaClient()

  const posts = await prisma.post.findMany({ 
    select: {
      id: true,
      title: true,
      author: {
        select: {
          name: true,
          photoUrl: true
        }
      },
      createdAt: true,
      comments: { 
        select: { 
          id: true 
        } 
      }
    }
  })

  const _posts = posts.map(post => ({
    ...post, 
    createdAt: JSON.stringify(post.createdAt),
    comments: post.comments.length
  }))

  return {
    props: { posts: _posts }
  }
}
