import { fetchAllBooks } from '@/api/book'
import AddBookButton from '@/common/AddBookButton'
import Modal from '@/common/Modal'
import AddBookModal from '@/common/modals/addBookModal'
import BookCard from '@/components/main-page/BookCard'
import { DAY_BG_COLOR, NIGHT_BG_COLOR } from '@/config/day-night-mode'
import { isDayState } from '@/recoil/day-night'
import type { BookType } from '@/types'
import { Space } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
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

const MainPage: React.FC = () => {
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
          <BookCard key={book.id} book={book} />
        ))}
      </Space>

      <AddBookButton></AddBookButton>
      <Modal contents={<AddBookModal />}></Modal>
    </Container>
  )
}

export default MainPage
