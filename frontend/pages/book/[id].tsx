import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useRecoilState, useRecoilValue } from 'recoil'
import { BookType } from '../../types'
import { bookListState } from '../../recoil/book'
import { useRouter } from 'next/router'
import { Maybe } from '../../components/utils/Maybe'
import API from '../../api'
import BookMark from '../../components/BookMark'
import { Space } from 'antd'
import Header from '../../components/common/Header'
import { DAY_BG_COLOR, NIGHT_BG_COLOR } from '../../config/day-night-mode'
import { isDayState } from '../../recoil/day-night'

type ContainerProps = {
  isDay: boolean
}
const Container = styled.div<ContainerProps>`
  display: flex;
  width: 100%;
  height: 100vh;
  transition: background-color 200ms ease;
  background-color: ${(props) => (props.isDay ? DAY_BG_COLOR : NIGHT_BG_COLOR)};
  flex-direction: column;
  align-items: center;
`

const Body = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
  max-width: 1280px;
  height: calc(100vh - 60px);
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  align-items: center;
  flex-direction: column;

  .book-add-container {
    input {
      margin-right: 20px;
    }
  }
`

const BookRoom: React.FC = () => {
  const isDay = useRecoilValue(isDayState)
  const [book, setBook] = useState<BookType>()
  const router = useRouter()
  let { id } = router.query

  const deleteBookAction = async () => {
    const res = await API.Book.deleteBook(Number(id))
    router.push('/')
  }
  const initBook = useRef(() => {})
  initBook.current = async () => {
    if (id === undefined) {
      id = window.location.href.split('book/')[1]
    }
    const book = await API.Book.fetchBook(Number(id))
    setBook(book[0])
  }
  useEffect(() => {
    initBook.current()
  }, [])
  return (
    <Container isDay={isDay}>
      <Header />
      <Body>
        <div className="book-info">
          <div>
            <h1>{book?.title}</h1>
          </div>
          <div className="book-updatedAd">{book?.updatedAt}</div>
          <div className="book-userId">{book?.userId}</div>

          {/* <button
          className="book-delete-button"
          onClick={() => deleteBookAction()}
        >
          X
        </button> */}
          <Space wrap direction="horizontal" size={20}>
            <BookMark></BookMark>
            <BookMark></BookMark>
            <BookMark></BookMark>
            <BookMark></BookMark>
          </Space>
        </div>
      </Body>
    </Container>
  )
}
export default BookRoom
