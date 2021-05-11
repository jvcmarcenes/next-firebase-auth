import { useAuth, User } from "./Auth"

export default function Header() {

  const { user, signInWithGoogle, signOut } = useAuth()

  function authWidget(user: User) {
    if (!user) return <> 
      <button onClick={() => signInWithGoogle()}>Log In</button>
    </>

    return <>
      <p>Hello, {user.name}</p>
      <img src={user.photoUrl ?? undefined} width='30px' height='30px' />
      <button onClick={() => signOut()}>Log Out</button>
    </>
  }

  return <> 
    <p>IDK AAA</p>
    { authWidget(user) }
  </>
}
