import React, { useEffect, useRef } from 'react'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { currentBookMarkState } from '../../../recoil/book'

const Container = styled.div`
  display: flex;
  flex: 0 auto;
  height: 100%;
  width: 300px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  border-left: 1px solid #393652;

  .bookMark-info {
    display: flex;
    flex-direction: row;
    color: #dfe2e8;
    padding: 20px;
    width: 100%;
    height: fit-content;
    align-items: center;
    .bookMark-page {
      display: flex;
      padding: 10px;
      font-size: 24px;
    }
    .bookMark-title {
      display: flex;
      padding: 10px;
      font-size: 18px;
    }
  }
`

type Props = unknown

// 코멘트 fetch 해와야한다
const ViewBookMark: React.FC<Props> = ({}) => {
  const currentBookMark = useRecoilValue(currentBookMarkState)

  // fetch Comment
  const initComment = useRef(() => {})
  initComment.current = () => {
    console.log('코멘트 fetch')
  }

  useEffect(() => {
    initComment.current()
  }, [])

  if (currentBookMark === undefined) {
    return <></>
  }
  return (
    <Container>
      <div className="bookMark-info">
        <div className="bookMark-page">{currentBookMark?.bookpage}</div>
        <div className="bookMark-title">{currentBookMark?.title}</div>
        <div className="bookMark-comment-wrapper"></div>
      </div>
    </Container>
  )
}
export default ViewBookMark
