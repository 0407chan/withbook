import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useRecoilState } from 'recoil'
import { BookType } from '../../types'
import { bookListState } from '../../recoil/book'
import { useRouter } from 'next/router'
import { Maybe } from '../../components/common/Maybe'
import API from '../../api'
const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin: 20px;
  background-color: #eeeeee;
`
const BookRoom: React.FC = () => {
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
    <Container>
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
      </div>
    </Container>
  )
}
export default BookRoom
