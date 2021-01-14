import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { bookListState } from '../recoil/book'
import Book from '../components/Book'
import API from '../api'
import type { BookType } from '../types'
const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 1320px;
  height: 100%;
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
    width: 100%;
  }
`
export default function Home() {
  const [bookList, setBookList] = useRecoilState<BookType[]>(bookListState)
  const [bookName, setBookName] = useState<string>('')
  const bookNameInput = useRef<HTMLInputElement>(null)

  const addNewBook = async () => {
    if (bookNameInput.current.value === '') return
    const newBook = await API.Book.addBook({ title: bookName.substr(0, 45) })
    setBookList([...bookList, newBook[0]])
    bookNameInput.current.value = ''
    setBookName('')
  }

  const searchBookAction = async () => {
    if (bookNameInput.current.value === '') return
    const newBook = await API.Book.searchBookOnNaver(bookName)
    setBookList([...bookList, newBook[0]])
    bookNameInput.current.value = ''
    setBookName('')
  }
  const setBookNameAction = (event: ChangeEvent<HTMLInputElement>) => {
    const newBookName = event.target.value
    setBookName(newBookName)
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
        <button onClick={() => searchBookAction()}>책 검사하기</button>
      </div>
      <div className="booklist-container">
        {bookList.map((book) => {
          return <Book key={book.id} book={book} />
        })}
      </div>
    </Container>
  )
}
