import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { PlusOutlined } from '@ant-design/icons'
import { isDayState } from '../../recoil/day-night'
import { modalOpenState } from '../../recoil/modal'
import { zIndexConfig } from '../../config'

export const ADD_BOOK_BUTTON_BG_COLOR_DAY = '#c7e3fc'
export const ADD_BOOK_BUTTON_BG_COLOR_NIGHT = '#fff2dc'
export const ADD_BOOK_BUTTON_FONT_COLOR_DAY = '#313d48'
export const ADD_BOOK_BUTTON_FONT_COLOR_NIGHT = '#835504'

type ContainerProps = {
  isDay: boolean
  isModalOpen: boolean
}
const Container = styled.div<ContainerProps>`
  display: flex;
  position: absolute;
  z-index: ${(props) => (props.isModalOpen ? zIndexConfig.modal : -1)};
  transition: background-color 200ms ease;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.isModalOpen ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0,0,0,0)'};

  .modal-contents {
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: ${zIndexConfig.modal + 1};
  }
`

type Props = {
  contents?: React.ReactNode
}
const Modal: React.FC<Props> = ({ contents }) => {
  const isDay = useRecoilValue<boolean>(isDayState)
  const [isModalOpen, setIsModalOpen] = useRecoilState<boolean>(modalOpenState)
  const closeModal = () => {
    console.log('모달 닫기!')
    setIsModalOpen(false)
  }

  return (
    <Container
      isDay={isDay}
      isModalOpen={isModalOpen}
      onClick={() => closeModal()}
    >
      <div className="modal-contents">{contents}</div>
    </Container>
  )
}
export default Modal
