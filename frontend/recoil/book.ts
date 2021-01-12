import { atom, selector } from 'recoil'
import { BookType } from '../types'
import { DUMMY_BOOK } from '../config'
export const bookListState = atom<BookType[]>({
  key: 'bookListState',
  default: DUMMY_BOOK
})
