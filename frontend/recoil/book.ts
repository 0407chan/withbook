import { atom, selector } from 'recoil'
import { Book } from '../types'

export const bookListState = atom<Book[]>({
  key: 'bookListState',
  default: [
    { id: 1, title: '에이트' },
    { id: 2, title: '이기적유전자' }
  ]
})
