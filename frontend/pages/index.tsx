import Head from 'next/head'
import { ChangeEvent, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { bookListState } from '../recoil/book'

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .index-title {
    font-size: 24px;
  }
`
export default function Home() {
  const [bookList, setBookList] = useRecoilState(bookListState)
  const [bookName, setBookName] = useState('')
  const bookNameInput = useRef<HTMLInputElement>(null)
  const addNewBook = () => {
    const newBookList = [...bookList, bookName]
    setBookList(newBookList)
    bookNameInput.current.value = ''
    setBookName('')
  }
  const setBookNameAction = (event: ChangeEvent<HTMLInputElement>) => {
    const newBookName = event.target.value
    setBookName(newBookName)
  }
  return (
    <Container>
      <Head>
        <title>WithBook</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>hello world!!!! 가자!! 이게 되네 ㅠㅠㅠ</h1>
      </div>
      <input
        ref={bookNameInput}
        onChange={(e) => setBookNameAction(e)}
        placeholder="책 제목을 입력해주세요"
      ></input>
      <button onClick={() => addNewBook()}>새 책 추가하기</button>

      {bookList.map((book) => {
        return <div key={book}>{book}</div>
      })}

      <div className="index-title">welcome!!!</div>
    </Container>
  )
}
