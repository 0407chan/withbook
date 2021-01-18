import { Space } from 'antd'
import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { selectedBookState } from '../recoil/book'
import { isDayState } from '../recoil/day-night'
import { FetchBookType } from '../types'

type ContainerProps = {
  image: string
  isSelected: boolean
}
const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  margin: 10px;
  width: 120px;
  height: 174px;
  background: url(${(props) => props.image});
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    border: 1px solid #eeeeee;
    box-shadow: 0px 1px 8px rgba(255, 255, 255, 0.3);
  }

  ${(props) => props.isSelected && 'border: 1px solid #00aeff;'}
  ${(props) => props.isSelected && 'transform: scale(1.05);'}
`

type Props = {
  book: FetchBookType
}
const SearchBook: React.FC<Props> = ({ book }) => {
  const [selectedBook, setSelectedBook] = useRecoilState<FetchBookType>(
    selectedBookState
  )
  const setCurrentBookAction = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    console.log(book)
    setSelectedBook(book)
    event.stopPropagation()
  }
  return (
    <Container
      onClick={(event) => setCurrentBookAction(event)}
      isSelected={selectedBook?.isbn === book.isbn}
      image={book.thumbnail}
    ></Container>
  )
}
export default SearchBook
