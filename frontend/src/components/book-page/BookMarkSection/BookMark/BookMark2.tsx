import React from 'react'
import styled from 'styled-components'

const ribbonWidth = 30

const Container = styled.div`
  .bookmark {
    padding: 10px 10px;
    height: 213px;
    width: 325px;
    position: relative;
    cursor: pointer;
  }
  .front {
    height: 188px;
    width: 300px;
    left: ${10 + 5}px; // border 기준 > padding + 모서리영역
    top: ${10 + 5}px;
    position: absolute;
    background-color: #232132;
    box-shadow: 1px 1px 6px rgba(255, 255, 255, 0.1);
    z-index: 1;
  }

  .back {
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

  .content {
    width: 100%;
    height: 100%;
    padding: 60px 20px 20px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    color: #eeeeee;
    font-size: 17px;
  }

  .bookmark:hover .front {
    transform: translate(3px, 3px);
    box-shadow: 5px 5px 15px rgba(255, 255, 255, 0.1);
    transition: all 0.2s ease-in-out;
  }
  .bookmark:hover .back {
    transform: translate(-2px, -2px);
    box-shadow: -2px -2px 6px rgba(255, 255, 255, 0.5);
    transition: all 0.2s ease;
  }
`

const BookMark2: React.FC = () => {
  return (
    <Container>
      <div className="bookmark">
        <div className="front">
          <span className="ribbon"></span>
          <div className="content">꽃이 진다고 그대를 잊은 적 없다.</div>
        </div>
        <div className="back"></div>
      </div>
    </Container>
  )
}
export default BookMark2
