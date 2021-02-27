import { Space } from 'antd'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import styled from 'styled-components'
import API from '../../api'
import { addBookmark } from '../../api/bookmark'
import BookMark from '../../components/BookMark'
import { Maybe } from '../../components/utils/Maybe'
import { DAY_BG_COLOR, NIGHT_BG_COLOR } from '../../config/day-night-mode'
import { bookMarkListState } from '../../recoil/book'
import { isDayState } from '../../recoil/day-night'
import type { BookType } from '../../types'
import { BookmarkBodyType, BookmarkType } from '../../types/bookmark'

type ContainerProps = {
  isDay: boolean
}
const Container = styled.div<ContainerProps>`
  display: flex;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  transition: background-color 200ms ease;
  background-color: ${(props) => (props.isDay ? DAY_BG_COLOR : NIGHT_BG_COLOR)};
  flex-direction: column;
  align-items: center;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  .book-info {
    display: flex;
  }
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

type BookRoomProps = {
  book: BookType
  bookmarkList: BookmarkType[]
}
const BookRoom: NextPage<BookRoomProps> = ({ book, bookmarkList }) => {
  const isDay = useRecoilValue(isDayState)
  const [bookmarks, setBookmarks] = useRecoilState<BookmarkType[]>(
    bookMarkListState
  )
  useEffect(() => {
    setBookmarks(bookmarkList)
  }, [])

  const router = useRouter()

  const deleteBookAction = async () => {
    const res = await API.Book.deleteBook(Number(book.id))
    router.push('/')
  }

  const bookmarkAdd = async () => {
    const randomNumber = Math.floor(Math.random() * 10) + 1
    const params: BookmarkBodyType = {
      bookId: Number(book.id),
      bookpage: randomNumber,
      title: '헤헤헿ㅎ'
    }

    const payload = await addBookmark(params)
    setBookmarks([...bookmarks, payload[0]])
  }

  return (
    <Container isDay={isDay}>
      <div className="book-info">
        <div>
          <h1>{book.title}</h1>
        </div>
        <div className="book-updatedAd">{book.updatedAt}</div>
        <div className="book-userId">{book.userId}</div>

        {/* <button
          className="book-delete-button"
          onClick={() => deleteBookAction()}
        >
          X
        </button> */}
      </div>
      <Maybe is={bookmarks.length > 0}>
        <Space
          wrap
          direction="horizontal"
          size={20}
          style={{ justifyContent: 'center' }}
        >
          {bookmarks.map((bookmark) => (
            <BookMark key={bookmark.id} bookmark={bookmark}></BookMark>
          ))}
        </Space>
      </Maybe>
      <div className="bookmark-add-button" onClick={() => bookmarkAdd()}>
        +
      </div>
    </Container>
  )
}

BookRoom.getInitialProps = async ({ query }) => {
  let bookId = query.id

  const book = await API.Book.fetchBook(Number(bookId))

  const bookMarkPayload = await API.Bookmark.fetchAllBookmarks(Number(bookId))

  return { book: book[0], bookmarkList: bookMarkPayload }
}

export default BookRoom
