import Head from 'next/head'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { bookListState } from '../recoil/book'
import API from '../api'
import { Book } from '../types'
const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 40px;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  .index-title {
    font-size: 24px;
  }
  .book-add-container {
    input {
      margin-right: 20px;
    }
  }

  .booklist-container {
    display: flex;
    flex-wrap: wrap;
    width: 1100px;
    margin: 20px;
    .book-container {
      display: flex;
      background-color: #eeeeee;
      justify-content: space-between;
      border-radius: 5px;
      width: 200px;
      padding: 5px 10px;
      margin: 10px;
      &:hover {
        background-color: #eeeeee;
      }
      .book {
        display: flex;
        width: 150px;
        word-break: break-all;
        justify-content: flex-start;
      }
      .book-delete-button {
        display: flex;
        height: 25px;
        width: 27px;
        margin-left: 5px;
        background-color: #ffffff;
        border-radius: 3px;
        padding: 4px 8px;
        color: #ff5252;
        border: 1px solid #ff5252;
        cursor: pointer;
        transition: color 200ms ease, background-color 200ms ease;
        &:hover {
          color: #ffd3d3;
          background-color: #ff5252;
        }
      }
    }
  }
`
export default function Home() {
  const [bookList, setBookList] = useRecoilState(bookListState)
  const [bookName, setBookName] = useState<string>('')
  const bookNameInput = useRef<HTMLInputElement>(null)
  const addNewBook = async () => {
    if (bookNameInput.current.value === '') return
    const newBook = await API.Book.addBook({ title: bookName.substr(0, 45) })
    setBookList([...bookList, newBook])
    bookNameInput.current.value = ''
    setBookName('')
  }
  const setBookNameAction = (event: ChangeEvent<HTMLInputElement>) => {
    const newBookName = event.target.value
    setBookName(newBookName)
  }

  const deleteBookAction = async (id: number) => {
    const res = await API.Book.deleteBook(id)
    if (res > 0) {
      const newBookList = bookList.filter((book) => book.id !== id)
      setBookList(newBookList)
    }
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
      <Head>
        <title>WithBook</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>WithBook</h1>
      </div>
      <div className="book-add-container">
        <input
          ref={bookNameInput}
          onChange={(e) => setBookNameAction(e)}
          placeholder="책 제목을 입력해주세요"
        ></input>
        <button onClick={() => addNewBook()}>새 책 추가하기</button>
      </div>
      <div className="booklist-container">
        {bookList.map((book) => {
          return (
            <div className="book-container" key={book.id}>
              <div className="book">{book.title}</div>
              <button
                className="book-delete-button"
                onClick={() => deleteBookAction(book.id)}
              >
                X
              </button>
            </div>
          )
        })}
      </div>
    </Container>
  )
}
