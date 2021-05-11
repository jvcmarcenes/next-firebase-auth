import { AppProps } from 'next/dist/next-server/lib/router/router'

import AuthProvider from '../components/Auth'
import Layout from '../components/Layout'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  </>
}

export default MyApp
