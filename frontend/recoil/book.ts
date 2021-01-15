import { atom, selector } from 'recoil'
import { BookType } from '../types'
export const bookListState = atom<BookType[]>({
  key: 'bookListState',
  default: []
})
