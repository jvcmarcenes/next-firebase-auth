import { GetServerSideProps } from "next"

import { PrismaClient } from "@prisma/client"
import Link from 'next/link'
import { server } from "../../config"
import { useAuth } from "../../components/Auth"
import { useRef } from "react"

interface Props {
  post: any
}

export default function ViewPost({ post }: Props) {

  const { user } = useAuth()

  const commentInput = useRef<HTMLInputElement>(null)

  async function postComment() {
    const content = commentInput.current?.value

    if (!content) return

    await fetch(`${server}/api/comment`, { 
      method: 'POST', 
      headers: user ? { authorization: user.uid } : { },
      body: JSON.stringify({
        content,
        post: post.id
      })
    })
  }

  return <>
    <main>
      <Link href={`${server}/`}> &larr; Go back </Link>
      <h1> {post.title} </h1>
      <p> {post.author.name} {'<' + post.author.email + '>'} </p>
      <p> {post.content} </p>
      <section>
        <h4> Comments: </h4>
        <div>
          <input type="text" ref={commentInput} />
          <button onClick={() => postComment()} > Comment </button>
        </div>
        {post.comments.map((comment: any) => <div>
          <img src={comment.author.email} width="20px" height="20px" />
          <p> {comment.author.name} {'<' + comment.author.email + '>'} </p>
          <p> {comment.content} </p>
        </div>)}
      </section>
    </main>
  </>
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {

  const id = query.id as string

  const prisma = new PrismaClient()
  const post = await prisma.post.findUnique({
    where: {
      id: id
    },
    select: {
      id: true,
      author: {
        select: {
          name: true,
          photoUrl: true
        }
      },
      title: true,
      content: true,
      comments: {
        select: {
          author: {
            select: {
              name: true,
              photoUrl: true
            }
          },
          content: true
        }
      }
    }
  })

  return {
    props: { post }
  }
}