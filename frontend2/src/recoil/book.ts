import { atom } from 'recoil'
import { BookType, FetchBookType } from '../types'
import { BookmarkType } from '../types/bookmark'
export const bookListState = atom<BookType[]>({
  key: 'bookListState',
  default: []
})

export const selectedBookState = atom<FetchBookType | undefined>({
  key: 'selectedBookState',
  default: undefined
})

export const bookMarkListState = atom<BookmarkType[]>({
  key: 'bookMarkListState',
  default: []
})

export const currentBookState = atom<BookType | undefined>({
  key: 'currentBookState',
  default: undefined
})

export const currentBookMarkState = atom<BookmarkType | undefined>({
  key: 'currentBookMarkSate',
  default: undefined
})
