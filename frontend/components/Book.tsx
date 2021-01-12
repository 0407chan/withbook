import React from 'react'
import styled from 'styled-components'
import { BookType } from '../types'
import API from '../api'
import { useRecoilState } from 'recoil'
import { bookListState } from '../recoil/book'
import { Maybe } from './common/Maybe'
import { useRouter } from 'next/router'

type ContainerProps = {
  image: string
}
const Container = styled.div<ContainerProps>`
  display: flex;
  width: 290px;
  height: 360px;
  margin: 20px;
  background: url(${(props) => props.image});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-color: #eeeeee;
  border-radius: 5px;
  justify-content: space-between;
  position: relative;
  cursor: pointer;

  .book-info {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 130px;
    display: flex;
    flex-direction: column;
    backdrop-filter: blur(15px);
    background-color: rgba(255, 255, 255, 0.4);
    z-index: 5;
    justify-content: center;
    align-items: center;

    &:hover {
      background-color: #eeeeee;
    }
    .book-title {
      display: flex;
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
`
type Props = {
  book?: BookType
}
const Book: React.FC<Props> = ({ book }) => {
  const router = useRouter()
  const [bookList, setBookList] = useRecoilState<BookType[]>(bookListState)

  const deleteBookAction = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => {
    e.stopPropagation()
    const res = await API.Book.deleteBook(id)
    if (res > 0) {
      const newBookList = bookList.filter((book) => book.id !== id)
      setBookList(newBookList)
    }
  }

  const linkToRoom = () => {
    router.push(`/book/${book.id}`)
  }

  return (
    <Container image={book.image} onClick={() => linkToRoom()}>
      <div className="book-info">
        <div className="book-title">{book.title}</div>
        <div className="book-updatedAd">{book.updatedAt}</div>
        <div className="book-userId">{book.userId}</div>
        <button
          className="book-delete-button"
          onClick={(e) => deleteBookAction(e, book.id)}
        >
          X
        </button>
      </div>

      <Maybe is={book.image === undefined || book.image === ''}>
        {book.title}
      </Maybe>
    </Container>
  )
}
export default Book
