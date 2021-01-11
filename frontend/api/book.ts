import axios from 'axios'
import { BookType, BookAddType } from '../types'

const API_SERVER = 'https://withbook.ml'
export const fetchAllBooks = async () => {
  const res = await axios.get<BookType[]>(`${API_SERVER}/api/v1/book`)
  return res.data
}

export const addBook = async (newBook: BookAddType) => {
  const res = await axios.post<BookType>(`${API_SERVER}/api/v1/book`, newBook)
  return res.data
}
export const deleteBook = async (id: number) => {
  const res = await axios.delete<number>(`${API_SERVER}/api/v1/book?id=${id}`)

  return res.data
}
