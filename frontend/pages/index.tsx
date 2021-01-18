import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { bookListState } from '../recoil/book'
import Book from '../components/Book'
import Header from '../components/common/Header'
import { Button, Input, Space } from 'antd'
import API from '../api'
import type { BookType, FetchBookType } from '../types'
import { isDayState } from '../recoil/day-night'
import { DAY_BG_COLOR, NIGHT_BG_COLOR } from '../config/day-night-mode'
import Search from 'antd/lib/input/Search'
import AddBookButton from '../components/common/AddBookButton'
import Modal from '../components/common/Modal'
import AddBookComponent from '../components/AddBookComponent'
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

const Home: React.FC = () => {
  const isDay = useRecoilValue(isDayState)
  const [bookList, setBookList] = useRecoilState<BookType[]>(bookListState)

  const initBook = useRef(() => {})
  initBook.current = async () => {
    const res = await API.Book.fetchAllBooks()
    setBookList(res)
  }

  useEffect(() => {
    initBook.current()
  }, [])
  return (
    <Container isDay={isDay}>
      <Header />
      {/* <Search onSearch={(value) => addNewBook(value)}></Search> */}
      <Body>
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
          {bookList.map((book, idx) => {
            return <Book key={idx} book={book} />
          })}
        </Space>
      </Body>
      <AddBookButton></AddBookButton>

      <Modal contents={<AddBookComponent />}></Modal>
    </Container>
  )
}

export default Home
