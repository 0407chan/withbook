import { atom } from 'recoil'
export const modalOpenState = atom<boolean>({
  key: 'modalOpenState',
  default: false
})
