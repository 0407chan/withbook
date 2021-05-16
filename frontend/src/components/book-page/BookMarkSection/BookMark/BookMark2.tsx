import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  .bookmark-wrapper2 {
    height: 198px;
    width: 310px;
    position: relative;
  }
  .bookmark {
    opacity: 0.99;
    height: 188px;
    width: 300px;
    left: 10px;
    top: 10px;
    position: relative;
    background-color: #eeeeee;
  }
  .bookmark:before {
    content: '';
    height: 188px;
    width: 300px;
    position: absolute;
    background-color: #b92020;
    left: -10px;
    top: -10px;
  }

  .ribbon {
    width: 60px;
    padding: 10px 0;
    position: absolute;
    top: -6px;
    left: 25px;
    text-align: center;
    border-top-left-radius: 3px;
    background: #f47530;
  }
  .ribbon:before {
    height: 0;
    width: 0;
    right: -5.5px;
    top: 0.1px;
    border-bottom: 6px solid #8d5a20;
    border-right: 6px solid transparent;
  }
  .ribbon:before,
  .ribbon:after {
    content: '';
    position: absolute;
  }
  .ribbon:after {
    height: 0;
    width: 0;
    bottom: -29.5px;
    left: 0;
    border-left: 30px solid #f47530;
    border-right: 30px solid #f47530;
    border-bottom: 30px solid transparent;
  }
`

const BookMark2: React.FC = () => {
  return (
    <Container>
      <div className="bookmark-wrapper2">
        <div className="bookmark">
          <span className="ribbon"></span>
          asdfasdf
        </div>
      </div>
    </Container>
  )
}
export default BookMark2
