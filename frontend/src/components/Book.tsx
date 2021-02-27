import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { BookType } from '../types'
import API from '../api'
import { useRecoilState, useRecoilValue } from 'recoil'
import { bookListState } from '../recoil/book'
import { Maybe } from './utils/Maybe'
import { useRouter } from 'next/router'
import { isDayState } from '../recoil/day-night'
import {
  DAY_BOOK_BG_COLOR,
  DAY_BOOK_BG_HOVER_COLOR,
  DAY_FONT_COLOR,
  NIGHT_BOOK_BG_COLOR,
  NIGHT_BOOK_BG_HOVER_COLOR,
  NIGHT_FONT_COLOR
} from '../config/day-night-mode'

type ContainerProps = {
  image: string
  isDay: boolean
}

const Container = styled.div<ContainerProps>`
  display: flex;
  width: 320px;
  height: 210px;
  margin: 20px;
  background-color: ${(props) =>
    props.isDay ? DAY_BOOK_BG_COLOR : NIGHT_BOOK_BG_COLOR};

  transition: background-color 200ms ease, color 200ms ease;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  color: ${(props) => (props.isDay ? DAY_FONT_COLOR : NIGHT_FONT_COLOR)};

  &:hover {
    background-color: ${(props) =>
      props.isDay ? DAY_BOOK_BG_HOVER_COLOR : NIGHT_BOOK_BG_HOVER_COLOR};
  }

  .book-img {
    display: flex;
    border-radius: 10px;
    margin: 0px 15px;
    height: 180px;
  }

  .book-info {
    padding: 15px;
    width: 100%;
    height: 100%;
    display: flex;
    border-radius: 10px;
    flex-direction: column;
    backdrop-filter: blur(15px);
    background-color: ${(props) =>
      props.isDay ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'};

    transition: background-color 200ms ease;
    z-index: 5;
    justify-content: space-between;

    .book-title {
      display: flex;
      font-size: 16px;
      word-break: break-all;
      justify-content: flex-start;
    }
    .book-user-wrapper {
      display: flex;
      flex-wrap: wrap;
      margin-left: 10px;

      .book-user-icon {
        display: flex;

        margin-left: -10px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
  }
`
// const Container = styled.div<ContainerProps>`
//   display: flex;
//   width: 250px;
//   height: 360px;
//   margin: 20px;
//   background-color: ${(props) =>
//     props.isDay ? DAY_BOOK_BG_COLOR : NIGHT_BOOK_BG_COLOR};

//   transition: background-color 200ms ease, color 200ms ease;
//   border-radius: 10px;
//   justify-content: center;
//   align-items: center;
//   position: relative;
//   cursor: pointer;
//   color: ${(props) => (props.isDay ? DAY_FONT_COLOR : NIGHT_FONT_COLOR)};

//   &:hover {
//     background-color: ${(props) =>
//       props.isDay ? DAY_BOOK_BG_HOVER_COLOR : NIGHT_BOOK_BG_HOVER_COLOR};
//   }

//   .book-img {
//     display: flex;
//     position: absolute;
//     border-radius: 10px;
//     top: 30px;
//     width: 130px;
//   }

//   .book-info {
//     position: absolute;
//     bottom: 0;
//     padding: 20px;
//     width: 100%;
//     height: 120px;
//     display: flex;

//     flex-direction: column;
//     backdrop-filter: blur(15px);
//     background-color: ${(props) =>
//       props.isDay ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'};

//     transition: background-color 200ms ease;
//     border-bottom-left-radius: 10px;
//     border-bottom-right-radius: 10px;
//     z-index: 5;
//     justify-content: center;
//     align-items: center;

//     .book-title {
//       display: flex;
//       word-break: break-all;
//       justify-content: flex-start;
//     }
// `

const IMG_CONFIG = [
  'image/월요일좋아1.png',
  'image/월요일좋아2.png',
  'image/이찬호.png'
]

type Props = {
  book?: BookType
}
const Book: React.FC<Props> = ({ book }) => {
  const router = useRouter()
  const isDay = useRecoilValue(isDayState)
  const [bookList, setBookList] = useRecoilState<BookType[]>(bookListState)
  const [userList, setUserList] = useState<string[]>([])
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

  const initUserList = useRef(() => {})
  initUserList.current = () => {
    const randomNumber = Math.round(Math.random() * 3)
    const newUserList = []
    for (let index = 0; index < randomNumber; index++) {
      newUserList.push(IMG_CONFIG[index])
    }
    setUserList(newUserList)
  }
  useEffect(() => {
    initUserList.current()
  }, [])

  return (
    <Container isDay={isDay} image={book.image} onClick={() => linkToRoom()}>
      <img className="book-img" src={book.image} />
      <div className="book-info">
        <div className="book-title">{book.title}</div>
        <Maybe is={userList.length > 0}>
          <div className="book-user-wrapper">
            {userList.map((user) => (
              <img className="book-user-icon" src={user}></img>
            ))}
          </div>
        </Maybe>
      </div>

      <Maybe is={book.image === undefined || book.image === ''}>
        {book.title}
      </Maybe>
    </Container>
  )
}
export default Book
