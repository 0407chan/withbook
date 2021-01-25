import { Space } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { DUMMY_COMMENT } from '../config'

const Container = styled.div`
  display: flex;
  box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.3);
  background-color: #fff;
  padding: 20px;

  .bookmark-page {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-weight: 600;
    border-radius: 10px;
  }
  .bookmark-title {
  }
`

type Props = {
  prop?: string
}
const BookMark: React.FC<Props> = ({ prop }) => {
  return (
    <Container>
      <Space size={20} direction="vertical">
        <Space size={20} direction="horizontal">
          <div className="bookmark-page">6</div>
          <div className="bookmark-title">
            사랑하라 한번도 상처받지 않은 것처럼
          </div>
        </Space>
        {DUMMY_COMMENT.map((comment, idx) => (
          <div className="comment" key={idx}>
            <div className="comment-writer">{comment.writer}</div>
            <div className="comment-content">{comment.content}</div>
          </div>
        ))}
      </Space>
    </Container>
  )
}
export default BookMark
