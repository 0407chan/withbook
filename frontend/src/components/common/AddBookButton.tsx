import { PlusOutlined } from '@ant-design/icons'
import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { zIndexConfig } from '../../config'
import { isDayState } from '../../recoil/day-night'
import { modalOpenState } from '../../recoil/modal'

export const ADD_BOOK_BUTTON_BG_COLOR_DAY = '#c7e3fc'
export const ADD_BOOK_BUTTON_BG_COLOR_NIGHT = '#fff2dc'
export const ADD_BOOK_BUTTON_FONT_COLOR_DAY = '#313d48'
export const ADD_BOOK_BUTTON_FONT_COLOR_NIGHT = '#835504'

type ContainerProps = {
  isDay: boolean
}
const Container = styled.div<ContainerProps>`
  display: flex;
  position: fixed;
  bottom: 30px;
  right: 30px;
  cursor: pointer;
  width: 50px;
  height: 50px;
  z-index: ${zIndexConfig.AddBookButton};
  padding: 5px 10px;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  transition: background-color 200ms ease, color 200ms ease;
  background-color: ${(props) =>
    props.isDay
      ? ADD_BOOK_BUTTON_BG_COLOR_DAY
      : ADD_BOOK_BUTTON_BG_COLOR_NIGHT};
  color: ${(props) =>
    props.isDay
      ? ADD_BOOK_BUTTON_FONT_COLOR_DAY
      : ADD_BOOK_BUTTON_FONT_COLOR_NIGHT};

  ${(props) => props.isDay && 'box-shadow:0px 1px 8px rgba(0,0,0,0.3);'}

  &:hover {
  }
`

type Props = {
  prop?: string
}
const AddBookButton: React.FC<Props> = ({ prop }) => {
  const [isModalOpen, setIsModalOpen] = useRecoilState<boolean>(modalOpenState)

  const isDay = useRecoilValue<boolean>(isDayState)
  const addNewBook = () => {
    setIsModalOpen(true)
  }

  return (
    <Container isDay={isDay} onClick={() => addNewBook()}>
      <PlusOutlined style={{ fontSize: 20 }} />
    </Container>
  )
}
export default AddBookButton
