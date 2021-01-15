import { Button, Space } from 'antd'
import React from 'react'
import styled from 'styled-components'
const Container = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  background-color: #ffffff;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
  .header-title {
    display: flex;
    height: 100%;
    font-size: 24px;
    font-weight: 600;

    justify-content: center;
    align-items: center;
  }
`
type Props = {
  prop?: string
}
const Header: React.FC<Props> = ({ prop }) => {
  const addNewBook = () => {
    console.log('새로 넣자!')
  }
  return (
    <Container>
      <Space
        direction="horizontal"
        style={{
          width: '100%',
          justifyContent: 'space-between',
          padding: '0px 20px'
        }}
      >
        <div className="header-title">WithBook</div>
        <Button onClick={() => addNewBook()}>새 책 추가하기</Button>
      </Space>
    </Container>
  )
}
export default Header
