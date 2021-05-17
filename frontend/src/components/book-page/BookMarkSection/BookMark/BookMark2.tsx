import React from 'react'
import styled from 'styled-components'

const ribbonWidth = 30

const Container = styled.div`
  .bookmark-wrapper2 {
    margin: 10px 10px;
    height: 198px;
    width: 310px;
    position: relative;
  }
  .bookmark-front {
    height: 188px;
    width: 300px;
    left: 5px;
    top: 5px;
    position: absolute;
    background-color: #232132;
    box-shadow: 1px 1px 6px rgba(255, 255, 255, 0.1);
    z-index: 1;
  }

  .bookmark-back {
    content: '';
    height: 188px;
    width: 300px;
    position: absolute;
    background-color: #ffffff;
    box-shadow: -1px -1px 6px rgba(255, 255, 255, 0.5);
  }

  .ribbon {
    width: ${ribbonWidth}px;
    padding: 10px 0;
    position: absolute;
    left: 25px;
    background: #eeeeee;
    z-index: 2;
  }

  .ribbon:after {
    content: '';
    position: absolute;
    height: 0;
    width: 0;
    bottom: -15px;
    left: 0;
    border-left: ${ribbonWidth / 2}px solid #eeeeee;
    border-right: ${ribbonWidth / 2}px solid #eeeeee;
    border-bottom: ${ribbonWidth / 2}px solid transparent;
  }

  .bookmark-content {
    width: 100%;
    height: 100%;
    padding: 60px 20px 20px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    color: #eeeeee;
    font-size: 17px;
  }
`

const BookMark2: React.FC = () => {
  return (
    <Container>
      <div className="bookmark-wrapper2">
        <div className="bookmark-front">
          <span className="ribbon"></span>
          <div className="bookmark-content">
            꽃이 진다고 그대를 잊은 적 없다.
          </div>
        </div>
        <div className="bookmark-back"></div>
      </div>
    </Container>
  )
}
export default BookMark2
