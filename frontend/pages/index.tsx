import Head from 'next/head'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .index-title {
    font-size: 24px;
  }
`
export default function Home() {
  return (
    <Container>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>hello world!!!!</h1>
      </div>
      <div className="index-title">welcome!!!</div>
    </Container>
  )
}
