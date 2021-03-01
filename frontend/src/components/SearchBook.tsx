import React from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { selectedBookState } from '../recoil/book'
import { FetchBookType } from '../types'

type ContainerProps = {
  image: string
  // isSelected: boolean
}
const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  margin: 10px;
  width: 120px;
  height: 174px;
  background: url(${(props) => props.image});
  cursor: pointer;
  opacity: 0.7;
  transition: transform 200ms ease;

  &:hover {
    transform: scale(1.03);
    opacity: 1;
    border: 1px solid #eeeeee;
    box-shadow: 0px 1px 8px rgba(255, 255, 255, 0.3);
  }

  &.selected-book {
    opacity: 1;
    border: 1px solid #00aeff;
    transform: scale(1.05);
  }
`

type Props = {
  book: FetchBookType
}
const SearchBook: React.FC<Props> = ({ book }) => {
  const [selectedBook, setSelectedBook] = useRecoilState<
    FetchBookType | undefined
  >(selectedBookState)
  const setCurrentBookAction = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setSelectedBook(book)
    event.stopPropagation()
  }
  return (
    <Container
      className={selectedBook?.isbn === book.isbn ? 'selected-book' : ''}
      onClick={(event) => setCurrentBookAction(event)}
      // isSelected={selectedBook?.isbn === book.isbn}
      image={book.thumbnail}
    ></Container>
  )
}
export default SearchBook
