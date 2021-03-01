import axios from 'axios'
import { BookmarkBodyType, BookmarkType } from '../types/bookmark'
import { isDev } from '../utils'

const API_SERVER = isDev ? 'http://localhost:3010' : 'https://withbook.ml'

export const fetchAllBookmarks = async (
  bookId: number
): Promise<BookmarkType[]> => {
  const res = await axios.get<BookmarkType[]>(
    `${API_SERVER}/api/v1/bookmark/all/${bookId}`
  )
  return res.data
}

export const fetchBookmark = async (id: number): Promise<BookmarkType> => {
  const res = await axios.get<BookmarkType>(
    `${API_SERVER}/api/v1/bookmark/${id}`
  )
  return res.data
}

export const addBookmark = async (
  newBookmark: BookmarkBodyType
): Promise<BookmarkType[]> => {
  const res = await axios.post<BookmarkType[]>(
    `${API_SERVER}/api/v1/bookmark`,
    newBookmark
  )
  return res.data
}

export const updateBookmark = async (
  newBookmark: BookmarkType
): Promise<BookmarkType> => {
  const res = await axios.patch<BookmarkType>(
    `${API_SERVER}/api/v1/bookmark`,
    newBookmark
  )
  return res.data
}
export const deleteBookmark = async (id: number): Promise<number> => {
  const res = await axios.delete<number>(`${API_SERVER}/api/v1/bookmark/${id}`)

  return res.data
}
