
import Link from 'next/link'
import { server } from '../config'

interface Props {
  post: any
}

export default function Post({ post }: Props) {
  return <>
    <div>
      <img src={post.author.photoUrl} width='50px' height='50px' />
      <p> {post.author.name} </p>
      <p> {post.title} </p>
      <Link href={`${server}/post/${post.id}`}> Read... </Link>
      <p> {post.createdAt} </p>
      <p> {post.comments} comments </p>
    </div>
    <br />
  </>
}