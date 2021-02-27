import '../styles/globals.css'
import 'antd/dist/antd.css'
import { RecoilRoot } from 'recoil'
import Head from 'next/head'
import Layout from '../components/layout/Layout'

const MyApp = ({ Component, pageProps }) => {
  return (
    <RecoilRoot>
      <Head>
        <title>WithBook</title>
        <link rel="icon" href="/favicon.ico" />
        <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  )
}

export default MyApp
