import { ReactNode } from "react";
import Head from 'next/head'

import Header from './Header'

interface Props {
  children?: ReactNode
}

export default function Layout({ children }: Props) {
  return <> 
    <Head>
      <title>AAAAAA</title>
    </Head>
    <Header />
    {children}
  </>
}