import axios from 'axios'
import { BookType, BookAddType } from '../types'

const API_SERVER = 'https://withbook.ml'
// const API_SERVER = 'http://localhost:3010'
export const fetchAllBooks = async () => {
  const res = await axios.get<BookType[]>(`${API_SERVER}/api/v1/book`)
  return res.data
}

export const fetchBook = async (id: number) => {
  const res = await axios.get<BookType>(`${API_SERVER}/api/v1/book/${id}`)
  return res.data
}

export const addBook = async (newBook: BookAddType) => {
  const res = await axios.post<BookType>(`${API_SERVER}/api/v1/book`, newBook)
  return res.data
}
export const deleteBook = async (id: number) => {
  const res = await axios.delete<number>(`${API_SERVER}/api/v1/book/${id}`)

  return res.data
}

export const searchBookOnNaver = async (bookName: string) => {
  const config = {
    headers: {
      'X-Naver-Client-Id': 'zEjutSJRBFbkf7eKGlzt',
      'X-Naver-Client-Secret': 'v9hdlJRure',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json;charset=utf-8'
    }
  }
  const payload = await axios.get<BookType>(
    `https://openapi.naver.com/v1/search/book.json?query=${bookName}&display=10&start=1`,
    config
  )

  console.log(payload)
  return payload
}
