import { Space } from 'antd'
import React, { useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import styled from 'styled-components'
import API from '../../api'
import { fetchBook } from '../../api/book'
import { addBookmark } from '../../api/bookmark'
import { DAY_BG_COLOR, NIGHT_BG_COLOR } from '../../config/day-night-mode'
import {
  bookMarkListState,
  currentBookMarkState,
  currentBookState
} from '../../recoil/book'
import { isDayState } from '../../recoil/day-night'
import type { BookType } from '../../types'
import { BookmarkBodyType, BookmarkType } from '../../types/bookmark'
import { Maybe } from '../utils/Maybe'
import BookMark from './bookMark'
import ViewBookMark from './viewBookMark'

type ContainerProps = {
  isDay: boolean
}
const Container = styled.div<ContainerProps>`
  display: flex;
  width: 100%;
  height: calc(100vh - 60px);

  transition: background-color 200ms ease;
  background-color: ${(props) => (props.isDay ? DAY_BG_COLOR : NIGHT_BG_COLOR)};
  flex-direction: row;
  align-items: center;

  .book-wrapper {
    display: flex;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
    height: 100%;
    width: 100;
    flex: 1;
    flex-direction: column;
    justify-content: flex-start;

    .book-add-container {
      input {
        margin-right: 20px;
      }
    }

    .bookmark-add-button {
      display: flex;
      margin: 20px;
      background-color: #fff;
      width: 50px;
      height: 50px;
      cursor: pointer;
      justify-content: center;
      align-items: center;

      transition: filter 200ms ease;
      &:hover {
        filter: brightness(0.7);
      }
    }
  }

  .bookmark-wrapper {
    display: flex;
    flex: 0 auto;
    height: 100%;
    width: 300px;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
    border-left: 1px solid #393652;
  }
`

const ViewBook: React.FC = () => {
  const history = useHistory()
  const isDay = useRecoilValue(isDayState)
  const [bookmarks, setBookmarks] = useRecoilState<BookmarkType[]>(
    bookMarkListState
  )
  const [currentBookMark, setCurrentBookMark] = useRecoilState(
    currentBookMarkState
  )
  const [currentBook, setCurrentBook] = useRecoilState<BookType | undefined>(
    currentBookState
  )

  const initBook = useRef(() => {})
  initBook.current = async () => {
    const path = window.location.pathname.split('/')
    const bookId = Number(path[2])
    const bookMarkId = Number(path[path.length - 1])

    const bookPayload = await fetchBook(bookId)
    setCurrentBook(bookPayload[0])
    const bookMarkPayload = await API.Bookmark.fetchAllBookmarks(bookId)
    setBookmarks(bookMarkPayload)

    const existBookMark = bookMarkPayload.find(
      (bookmark) => bookmark.id === bookMarkId
    )
    if (existBookMark) {
      setCurrentBookMark(existBookMark)
    }
  }
  useEffect(() => {
    initBook.current()
  }, [window.location.pathname])

  const deleteBookAction = async () => {
    const res = await API.Book.deleteBook(Number(currentBook!.id))
    history.push('/')
  }

  const bookmarkAdd = async () => {
    const randomNumber = Math.floor(Math.random() * 10) + 1
    const params: BookmarkBodyType = {
      bookId: Number(currentBook!.id),
      bookpage: randomNumber,
      title: '헤헤헿ㅎ'
    }

    const payload = await addBookmark(params)
    setBookmarks([...bookmarks, payload[0]])
  }

  return (
    <Container isDay={isDay}>
      <div className="book-wrapper">
        <div>
          <h1>{currentBook?.title}</h1>
        </div>
        <div className="book-updatedAd">{currentBook?.updatedAt}</div>
        <div className="book-userId">{currentBook?.userId}</div>
        <Maybe is={bookmarks.length > 0}>
          <Space wrap direction="horizontal" size={20}>
            {bookmarks.map((bookmark) => (
              <BookMark key={bookmark.id} bookmark={bookmark}></BookMark>
            ))}
          </Space>
        </Maybe>

        <div className="bookmark-add-button" onClick={() => bookmarkAdd()}>
          +
        </div>
      </div>

      <ViewBookMark />
    </Container>
  )
}

export default ViewBook
