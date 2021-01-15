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
  padding-top: 90px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  flex-direction: column;
  justify-content: center;
  align-items: center;

  .book-add-container {
    input {
      margin-right: 20px;
    }
  }
`

export default function Home() {
  const isDay = useRecoilValue(isDayState)

  const [bookList, setBookList] = useRecoilState<BookType[]>(bookListState)
  const [bookName, setBookName] = useState<string>('')
  const [searchBookList, setSearchBookList] = useState<FetchBookType[]>([])

  const addNewBook = async (value: string) => {
    if (value === '') return
    const newBook = await API.Book.addBook({ title: value.substr(0, 45) })
    setBookList([...bookList, newBook[0]])
    setBookName('')
  }

  const searchBookAction = async () => {
    if (bookName === '') return
    const newBook = await API.Book.searchBook(bookName)
    setSearchBookList(newBook)
    setBookName('')
  }
  const setBookNameAction = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBookName(event.target.value)
  }

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
        <Space wrap direction="horizontal" size={0} style={{ width: '1280px' }}>
          {bookList.map((book, idx) => {
            return <Book key={idx} book={book} />
          })}
        </Space>
      </Body>
    </Container>
  )
}
