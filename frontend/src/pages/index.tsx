import { Space } from 'antd'
import { NextPage } from 'next'
import React from 'react'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { fetchAllBooks } from '../api/book'
import Book from '../components/Book'
import AddBookButton from '../components/common/AddBookButton'
import Modal from '../components/common/Modal'
import AddBookModal from '../components/modals/AddBookModal'
import { DAY_BG_COLOR, NIGHT_BG_COLOR } from '../config/day-night-mode'
import { isDayState } from '../recoil/day-night'
import type { BookType } from '../types'
type ContainerProps = {
  isDay: boolean
}
const Container = styled.div<ContainerProps>`
  display: flex;
  transition: background-color 200ms ease;
  background-color: ${(props) => (props.isDay ? DAY_BG_COLOR : NIGHT_BG_COLOR)};

  width: 100%;
  height: 100%;
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

type HomeProps = {
  bookList: BookType[]
}
const Home: NextPage<HomeProps> = ({ bookList }) => {
  const isDay = useRecoilValue(isDayState)

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

      <Modal contents={<AddBookModal />}></Modal>
    </Container>
  )
}

Home.getInitialProps = async () => {
  const res = await fetchAllBooks()
  return { bookList: res }
}
export default Home
