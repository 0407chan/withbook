import { atom, selector } from 'recoil'

export const bookListState = atom({
  key: 'bookListState',
  default: ['에이트', '이기적유전자']
})
