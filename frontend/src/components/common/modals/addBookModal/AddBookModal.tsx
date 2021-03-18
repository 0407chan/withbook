import { Space } from 'antd'
import Search from 'antd/lib/input/Search'
import React, { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import styled from 'styled-components'
import API from '../../../../api'
import { searchBook } from '../../../../api/kakaoApi'
import {
  DAY_BG_COLOR,
  DAY_FONT_COLOR,
  NIGHT_BG_COLOR,
  NIGHT_FONT_COLOR
} from '../../../../config/day-night-mode'
import { bookListState, selectedBookState } from '../../../../recoil/book'
import { isDayState } from '../../../../recoil/day-night'
import { modalOpenState } from '../../../../recoil/modal'
import { BookAddType, BookType, FetchBookType } from '../../../../types'
import SearchBook from './SearchBook'

type ContainerProps = {
  isDay: boolean
}
const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  position: absolute;
  transition: background-color 200ms ease;
  width: 762px;
  height: fit-content;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #3f3b59;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.isDay ? DAY_BG_COLOR : NIGHT_BG_COLOR)};
  box-shadow: 0px 2px 24px rgba(0, 0, 0, 0.7);
  color: ${(props) => (props.isDay ? DAY_FONT_COLOR : NIGHT_FONT_COLOR)};

  .addbook-search-book-wrapper {
    .addbook-search-book-result {
      display: flex;
      flex-wrap: wrap;
      padding: 10px;
    }
  }

  .addbook-button-wrapper {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .addbook-button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 60px;
      height: 30px;
      padding: 5px 10px;
      border-radius: 5px;
      border: 1px solid ${DAY_BG_COLOR};
      background-color: ${NIGHT_BG_COLOR};
      cursor: pointer;
    }
  }
`

type Props = {
  contents?: React.ReactNode
}
const AddBookModal: React.FC<Props> = ({ contents }) => {
  const isDay = useRecoilValue<boolean>(isDayState)
  const [searchBookList, setSearchBookList] = useState<FetchBookType[]>([])
  const [bookList, setBookList] = useRecoilState<BookType[]>(bookListState)
  const [selectedBook, setSelectedBook] = useRecoilState<
    FetchBookType | undefined
  >(selectedBookState)

  const [isModalOpen, setIsModalOpen] = useRecoilState<boolean>(modalOpenState)

  const [searchKeyword, setSearchKeyword] = useState('')

  const closeModal = () => {
    setSearchBookList([])
    setSearchKeyword('')
    setIsModalOpen(false)
  }

  const stopPropagationAction = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation()
    setSelectedBook(undefined)
  }

  const setSearchKeywordAction = (value: string) => {
    setSearchKeyword(value)
  }
  const bookSearchAction = async () => {
    if (searchKeyword === '') return
    const payload = await searchBook(searchKeyword)
    if (payload) {
      setSearchBookList(payload.filter((book) => book.thumbnail !== ''))
      setSearchKeyword('')
    }
  }
  const addNewRoomAction = async () => {
    const params: BookAddType = {
      title: selectedBook!.title,
      image: selectedBook!.thumbnail
    }

    const payload = await API.Book.addBook(params)
    setBookList([...bookList, payload[0]])
    closeModal()
  }
  return (
    <Container isDay={isDay} onClick={(e) => stopPropagationAction(e)}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div className="addbook-header">방 추가하기</div>
        <div className="addbook-room-info-wrapper">방 정보</div>

        <div className="addbook-search-book-wrapper">
          책 검색
          <Search
            value={searchKeyword}
            onChange={(event) => setSearchKeywordAction(event.target.value)}
            onSearch={() => bookSearchAction()}
          ></Search>
          <div className="addbook-search-book-result">
            {searchBookList.map((book, bookIdx) => {
              return <SearchBook key={bookIdx} book={book}></SearchBook>
            })}
          </div>
        </div>
        <div className="addbook-button-wrapper">
          <Space
            direction="horizontal"
            size="large"
            style={{ justifyContent: 'center' }}
          >
            <button
              className="addbook-button confirm"
              type="button"
              onClick={() => addNewRoomAction()}
            >
              추가
            </button>
            <button
              className="addbook-button cancle"
              type="button"
              onClick={() => closeModal()}
            >
              취소
            </button>
          </Space>
        </div>
      </Space>
    </Container>
  )
}
export default AddBookModal
