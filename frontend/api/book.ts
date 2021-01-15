import axios from 'axios'
import { BookType, BookAddType, FetchBookType } from '../types'
import { isDev } from '../utils'

const API_SERVER = isDev ? 'http://localhost:3010' : 'https://withbook.ml'
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

export const searchBook = async (
  bookName: string
): Promise<FetchBookType[]> => {
  const config = {
    headers: {
      Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`
    }
  }
  const payload = await axios.get(
    `https://dapi.kakao.com/v3/search/book?target=title&query=${bookName}`,
    config
  )

  return payload.data
}
