import { fetchBook } from '@/api/book'
import { fetchAllBookmarks } from '@/api/bookmark'
import { Maybe } from '@/components/utils/Maybe'
import {
  bookMarkListState,
  currentBookMarkState,
  currentBookState
} from '@/recoil/book'
import { BookType } from '@/types'
import { BookmarkType } from '@/types/bookmark'
import { Space } from 'antd'
import React, { useEffect, useRef } from 'react'
import { useRecoilState } from 'recoil'
import BookMark2 from './BookMark/BookMark2'

const BookMarkSection: React.FC = () => {
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
    const bookMarkPayload = await fetchAllBookmarks(bookId)
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

  return (
    <div>
      BookMarkSection
      <Maybe is={bookmarks.length > 0}>
        <Space wrap direction="horizontal" size={20}>
          {bookmarks.map((bookmark) => (
            <BookMark2 key={bookmark.id} bookmark={bookmark}></BookMark2>
          ))}
        </Space>
      </Maybe>
    </div>
  )
}

export default BookMarkSection
