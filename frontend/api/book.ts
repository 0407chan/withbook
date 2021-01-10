import axios from 'axios'
import { Book, BookAddType } from '../types'

export const fetchAllBooks = async () => {
  const res = await axios.get<Book[]>('http://localhost:3010/api/v1/book')
  console.log('책 가져오기', window.location.href)
  return res.data
}

export const addBook = async (newBook: BookAddType) => {
  const res = await axios.post<Book>(
    'http://localhost:3010/api/v1/book',
    newBook
  )
  console.log('책 추가하기', window.location.href)
  return res.data
}
export const deleteBook = async (id: number) => {
  const res = await axios.delete<number>(
    `http://localhost:3010/api/v1/book?id=${id}`
  )

  return res.data
}
