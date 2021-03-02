import { Space } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { fetchAllBooks } from '../../api/book'
import { DAY_BG_COLOR, NIGHT_BG_COLOR } from '../../config/day-night-mode'
import { isDayState } from '../../recoil/day-night'
import type { BookType } from '../../types'
import AddBookButton from '../common/AddBookButton'
import Book from './Book'
type ContainerProps = {
  isDay: boolean
}
const Container = styled.div<ContainerProps>`
  display: flex;
  transition: background-color 200ms ease;
  background-color: ${(props) => (props.isDay ? DAY_BG_COLOR : NIGHT_BG_COLOR)};

  width: 100%;
  height: calc(100vh - 60px);
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  .book-add-container {
    input {
      margin-right: 20px;
    }
  }
`

const Home: React.FC = () => {
  const isDay = useRecoilValue(isDayState)
  const [bookList, setBookList] = useState<BookType[]>([])

  const initBookList = useRef(() => {})
  initBookList.current = async () => {
    const res = await fetchAllBooks()
    setBookList(res)
  }

  useEffect(() => {
    initBookList.current()
  }, [])

  return (
    <Container isDay={isDay}>
      <Space
        wrap
        direction="horizontal"
        size={0}
        style={{
          maxWidth: '1280px',
          paddingTop: 20,
          width: '100%',
          justifyContent: 'center'
        }}
      >
        {bookList.map((book) => (
          <Book key={book.id} book={book} />
        ))}
      </Space>

      <AddBookButton></AddBookButton>
      {/* <Modal contents={<AddBookModal />}></Modal> */}
    </Container>
  )
}

export default Home
