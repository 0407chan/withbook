import { zIndexConfig } from '@/config'
import {
  DAY,
  DAY_BG_COLOR,
  DAY_FONT_COLOR,
  NIGHT,
  NIGHT_BG_COLOR,
  NIGHT_FONT_COLOR
} from '@/config/day-night-mode'
import { bookMarkListState, currentBookMarkState } from '@/recoil/book'
import { isDayState } from '@/recoil/day-night'
import { BookmarkType } from '@/types/bookmark'
import Space from 'antd/lib/space'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'

type ContainerProps = {
  isDay: boolean
}
const Container = styled.div<ContainerProps>`
  display: flex;
  width: 100%;
  height: 60px;
  position: sticky;
  top: 0;
  z-index: ${zIndexConfig.header};
  background-color: ${(props) => (props.isDay ? DAY_BG_COLOR : NIGHT_BG_COLOR)};
  color: ${(props) => (props.isDay ? DAY_FONT_COLOR : NIGHT_FONT_COLOR)};
  box-shadow: ${(props) =>
    props.isDay
      ? '0px 1px 6px rgba(0, 0, 0, 0.1)'
      : '0px 1px 6px rgba(255, 255, 255, 0.1)'};

  transition: background-color 200ms ease, color 200ms ease,
    box-shadow 200ms ease;

  .header-title {
    display: flex;
    height: 100%;
    font-size: 24px;
    font-weight: 600;

    justify-content: center;
    align-items: center;
    cursor: pointer;

    transition: 200ms color ease;

    &:hover {
      color: ${(props) =>
        props.isDay
          ? DAY.headerWithBookHoverColor
          : NIGHT.headerWithBookHoverColor};
    }
  }
`

type DayNightButtonProps = {
  isDay: boolean
}

const DayNightButton = styled.div<DayNightButtonProps>`
  display: flex;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`

const Header: React.FC = () => {
  const [isDay, setIsDay] = useRecoilState<boolean>(isDayState)
  const router = useHistory()
  const [currentBookMark, setCurrentBookMark] = useRecoilState(
    currentBookMarkState
  )
  const [bookmarks, setBookmarks] = useRecoilState<BookmarkType[]>(
    bookMarkListState
  )

  const toggleDayNight = () => {
    // console.log(isDay ? '아침이네' : '밤이네')
    setIsDay(!isDay)
  }

  const goHome = () => {
    setCurrentBookMark(undefined)
    setBookmarks([])

    // 로그인 돼있으면 home, 아니면 landing
    router.push(`/home`)
  }

  return (
    <Container isDay={isDay}>
      <Space
        direction="horizontal"
        style={{
          width: '100%',
          justifyContent: 'space-between',
          padding: '0px 20px'
        }}
      >
        <div className="header-title" onClick={() => goHome()}>
          WithBook
        </div>
        <DayNightButton isDay={isDay} onClick={() => toggleDayNight()}>
          {isDay ? (
            <img alt="night-png" width="30px" src="/image/moon.png" />
          ) : (
            <img alt="sun-png" width="30px" src="/image/sun.png" />
          )}
        </DayNightButton>
      </Space>
    </Container>
  )
}
export default Header
