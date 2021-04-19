import { zIndexConfig } from '@/config'
import { isDayState } from '@/recoil/day-night'
import { modalOpenState } from '@/recoil/modal'
import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import styled from 'styled-components'

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
  top: 0;
  z-index: ${(props) => (props.isModalOpen ? zIndexConfig.modal : -1)};
  transition: background-color 200ms ease, z-index 200ms ease;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.isModalOpen ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0,0,0,0)'};

  .modal-contents {
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: ${(props) => (props.isModalOpen ? '1' : '0')};
    transition: opacity 200ms ease;
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
    // console.log('모달 닫기!')
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
