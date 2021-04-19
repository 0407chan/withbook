import Button from 'antd/lib/button/button'
import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { NIGHT } from '../../config/day-night-mode'

const Container = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 60px);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${NIGHT.BackgroundColor};

  .landing-title {
    color: ${NIGHT.FontColor};
    font-size: 48px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .landing-subtitle {
    font-size: 32px;
    margin-bottom: 40px;
    color: #8b8b96;
  }
  .landing-login-button {
    height: fit-content;
    width: fit-content;
    font-size: 24px;

    &:hover {
    }
  }
`

// 코멘트 fetch 해와야한다
const LandingPage: React.FC = () => {
  const history = useHistory()

  const showLoginModal = () => {
    history.push('/home')
  }

  return (
    <Container>
      <div className="landing-title">
        다른사람과 함께 책을 읽고 공유해보세요
      </div>
      <div className="landing-subtitle">
        언제 어디서든 여러분의 영감을 나눌 수 있습니다.
      </div>
      <Button
        onClick={() => showLoginModal()}
        className="landing-login-button"
        size="large"
      >
        로그인
      </Button>
    </Container>
  )
}
export default LandingPage
