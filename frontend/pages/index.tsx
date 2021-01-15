import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { bookListState } from '../recoil/book'
import Book from '../components/Book'
import Header from '../components/common/Header'
import { Button, Input, Space } from 'antd'
import API from '../api'
import type { BookType, FetchBookType } from '../types'
const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
`

const Body = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  max-width: 1280px;
  margin-top: 30px;
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
  const [bookList, setBookList] = useRecoilState<BookType[]>(bookListState)
  const [bookName, setBookName] = useState<string>('')
  const [searchBookList, setSearchBookList] = useState<FetchBookType[]>([])

  const addNewBook = async () => {
    if (bookName === '') return
    const newBook = await API.Book.addBook({ title: bookName.substr(0, 45) })
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
    <Container>
      <Header />
      <Body>
        <Space wrap direction="horizontal" size={0} style={{ width: '100%' }}>
          {bookList.map((book, idx) => {
            return <Book key={idx} book={book} />
          })}
        </Space>
      </Body>
    </Container>
  )
}
