import { Button, Space } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { deleteBookmark } from '../api/bookmark'
import { DUMMY_COMMENT } from '../config'
import {
  bookMarkListState,
  currentBookMarkState,
  currentBookState
} from '../recoil/book'
import { BookmarkType } from '../types/bookmark'

const Container = styled.div`
  display: flex;
  box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.3);
  background-color: #fff;
  padding: 20px;
  cursor: pointer;

  .bookmark-page {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-weight: 600;
    border-radius: 10px;
  }
  .bookmark-title {
  }

  .bookmark-delete-button {
  }
`

type Props = {
  bookmark: BookmarkType
}

// 코멘트 fetch 해와야한다
const BookMark: React.FC<Props> = ({ bookmark }) => {
  const router = useRouter()
  const currentBook = useRecoilValue(currentBookState)
  const [currentBookMark, setCurrentBookMark] = useRecoilState(
    currentBookMarkState
  )
  const [bookmarkList, setBookmarkList] = useRecoilState(bookMarkListState)

  const deleteBookMarkAction = async () => {
    const payload = await deleteBookmark(bookmark.id)
    if (payload) {
      setBookmarkList(
        bookmarkList.filter((bookmark) => bookmark.id !== payload)
      )
    }
  }

  const showBookmarkAction = () => {
    setCurrentBookMark(bookmark)
  }
  return (
    <Container
      onClick={() => {
        showBookmarkAction()
      }}
    >
      <Space size={20} direction="vertical">
        <Space size={20} direction="horizontal">
          <div className="bookmark-page">{bookmark.bookpage}</div>
          <div className="bookmark-title">{bookmark.title}</div>
        </Space>
        {DUMMY_COMMENT.map((comment, idx) => (
          <div className="comment" key={idx}>
            <div className="comment-writer">{comment.writer}</div>
            <div className="comment-content">{comment.content}</div>
          </div>
        ))}
        <Button
          className="bookmark-delete-button"
          onClick={() => deleteBookMarkAction()}
          danger
        >
          삭제
        </Button>
      </Space>
    </Container>
  )
}
export default BookMark
