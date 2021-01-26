import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useRecoilState, useRecoilValue } from 'recoil'
import { BookType } from '../../types'
import { bookListState } from '../../recoil/book'
import { useRouter } from 'next/router'
import { Maybe } from '../../components/utils/Maybe'
import API from '../../api'
import BookMark from '../../components/BookMark'
import { Space } from 'antd'
import Header from '../../components/common/Header'
import { DAY_BG_COLOR, NIGHT_BG_COLOR } from '../../config/day-night-mode'
import { isDayState } from '../../recoil/day-night'
import { BookmarkBodyType, BookmarkType } from '../../types/bookmark'
import { addBookmark } from '../../api/bookmark'

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
  padding: 20px;
  max-width: 1280px;
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
`

const BookRoom: React.FC = () => {
  const isDay = useRecoilValue(isDayState)
  const [book, setBook] = useState<BookType>()
  const [bookmarks, setBookmarks] = useState<BookmarkType[]>([])
  const router = useRouter()
  let { bookId } = router.query

  const deleteBookAction = async () => {
    const res = await API.Book.deleteBook(Number(bookId))
    router.push('/')
  }
  const initBook = useRef(() => {})
  initBook.current = async () => {
    if (bookId === undefined) {
      bookId = window.location.href.split('book/')[1]
    }
    const book = await API.Book.fetchBook(Number(bookId))
    const bookmarkList = await API.Bookmark.fetchAllBookmarks(Number(bookId))
    setBookmarks(bookmarkList)
    setBook(book[0])
  }

  useEffect(() => {
    initBook.current()
  }, [])

  const bookmarkAdd = async () => {
    if (bookId === undefined) {
      bookId = window.location.href.split('book/')[1]
    }

    const params: BookmarkBodyType = {
      bookId: Number(bookId),
      bookpage: Math.floor(Math.random() * 10),
      title: '오냐냐냐냐'
    }

    const payload = await addBookmark(params)
    setBookmarks([...bookmarks, payload])
  }

  return (
    <Container isDay={isDay}>
      <Header />
      <Body>
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
        <Maybe is={bookmarks.length > 0}>
          <Space wrap direction="horizontal" size={20}>
            {bookmarks.map((bookmark) => (
              <BookMark key={bookmark.id}></BookMark>
            ))}
          </Space>
        </Maybe>
        <div className="bookmark-add-button" onClick={() => bookmarkAdd()}>
          +
        </div>
      </Body>
    </Container>
  )
}
export default BookRoom
