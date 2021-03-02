import React from 'react'
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
`

type Props = unknown

// 코멘트 fetch 해와야한다
const ViewBookMark: React.FC<Props> = ({}) => {
  const currentBookMark = useRecoilValue(currentBookMarkState)
  if (currentBookMark === undefined) {
    return <></>
  }

  return <Container>{currentBookMark?.title}</Container>
}
export default ViewBookMark
