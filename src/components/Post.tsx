
interface Props {
  post: any
}

export default function Post({ post }: Props) {
  return <>
    <img src={post.author.photoUrl} width='50px' height='50px' />
    <p> {post.author.name} </p>
    <p> {post.title} </p>
    <p> {post.createdAt} </p>
    <br />
  </>
}