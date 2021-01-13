import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useRecoilState } from 'recoil'
import { BookType } from '../../types'
import { bookListState } from '../../recoil/book'
import { useRouter } from 'next/router'
import { Maybe } from '../../components/common/Maybe'

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin: 20px;
  background-color: #eeeeee;
`
const BookRoom: React.FC = () => {
  const [bookList, setBookList] = useRecoilState<BookType[]>(bookListState)
  const [book, setBook] = useState<BookType>()
  const router = useRouter()
  const { id } = router.query

  const initBook = useRef(() => {})
  initBook.current = () => {
    console.log(id)
    const book = bookList.filter((book) => book.id === Number(id))
    setBook(book[0])
  }
  useEffect(() => {
    initBook.current()
  }, [])
  return (
    <Container>
      <div className="book-info">
        <div>
          <h1>디테일!!! {id}</h1>
        </div>
        <div className="book-title">{book?.title}</div>
        <div className="book-updatedAd">{book?.updatedAt}</div>
        <div className="book-userId">{book?.userId}</div>

        <button className="book-delete-button">X</button>
      </div>
    </Container>
  )
}
export default BookRoom
