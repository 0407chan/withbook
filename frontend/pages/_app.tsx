import '../styles/globals.css'
import { RecoilRoot } from 'recoil'
import Head from 'next/head'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`
const MyApp = ({ Component, pageProps }) => {
  return (
    <RecoilRoot>
      <Container>
        <Head>
          <title>WithBook</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </Container>
    </RecoilRoot>
  )
}

export default MyApp
