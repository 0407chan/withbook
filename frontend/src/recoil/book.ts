import { atom, selector } from 'recoil'
import { BookType, FetchBookType } from '../types'
export const bookListState = atom<BookType[]>({
  key: 'bookListState',
  default: []
})

export const selectedBookState = atom<FetchBookType>({
  key: 'selectedBookState',
  default: undefined
})
