import Header from '../common/Header'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  .body {
    display: flex;
    height: calc(100vh - 60px);
  }
`

const Layout = ({ children }) => {
  return (
    <Container>
      <Header />
      <div className="body">{children}</div>
    </Container>
  )
}

export default Layout
