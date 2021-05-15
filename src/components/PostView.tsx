import Post from './Post'

interface Props {
  posts: any
}

export default function PostView({ posts }: Props) {

  console.log(posts)

  if (!posts) return <p> 'posts' is undefined </p>

  if (posts.length === 0) return <>
    Nothing to see here...
  </>

  return <>
    {posts.map((post: any) => <Post key={post.id} post={post} />)}
  </>
}
