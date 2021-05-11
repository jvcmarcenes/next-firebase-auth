import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import Router from 'next/router'
import firebase from '../lib/firebase'

interface Context {
  user: User
  loading: boolean
  signInWithGoogle: (redirect?: string) => Promise<void>
  signOut: () => Promise<void>
}

const authContext = createContext<Context | null>(null)

export type User = {
  uid: string
  email: string | null
  name: string | null
  provider?: string
  photoUrl: string | null
} | null

interface Props {
  children?: ReactNode
}

export default function AuthProvider({ children }: Props) {
  const auth = useFirebaseAuth()

  return <authContext.Provider value={auth}>
    {children}
  </authContext.Provider>
}

async function formatUser(user: firebase.User): Promise<User> {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0]?.providerId,
    photoUrl: user.photoURL
  }
}

function useFirebaseAuth() {
  const [ user, setUser ] = useState<User>(null)
  const [ loading, setLoading ] = useState<boolean>(true)

  async function handleUser(rawUser: firebase.User | null) {
    if (!rawUser) {
      setUser(null)
      setLoading(false)
      return null
    }

    const user = await formatUser(rawUser)

    if (!user) return null

    // const { uid } = user
    // createUser(user.uid, userWithoutToken) // api call to register user

    setUser(user)
    setLoading(false)
    return user
  }

  async function signInWithGoogle(redirect?: string) {
    setLoading(true)

    const res = await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());

    handleUser(res.user);

    if (redirect) Router.push(redirect);
  }

  async function signOut() {
    await firebase.auth().signOut()

    handleUser(null)
  }

  useEffect(() => {
    const unsubscribe = firebase.auth().onIdTokenChanged(handleUser)
    return () => unsubscribe()
  }, [])

  return { user, loading, signInWithGoogle, signOut }
}

export function useAuth() {
  return useContext(authContext) as Context
}