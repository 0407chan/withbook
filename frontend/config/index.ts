import type { BookType } from '../types'
import { format } from 'date-fns'
export * as default from './day-night-mode'

export const zIndexConfig = {
  header: 10,
  AddBookButton: 20,
  modal: 500
}
export const DUMMY_BOOK: BookType[] = [
  {
    id: 1,
    title: '이기적 유전자',
    createdAt: `${format(new Date(), 'yyyy-MM-dd HH:mm')}`,
    updatedAt: `${format(new Date(), 'yyyy-MM-dd HH:mm')}`,
    image: '/image/월요일좋아1.png',
    userId: 1
  },
  {
    id: 2,
    title: '행복의기원',
    createdAt: `${format(new Date(), 'yyyy-MM-dd HH:mm')}`,
    updatedAt: `${format(new Date(), 'yyyy-MM-dd HH:mm')}`,
    image: '/image/월요일좋아2.png',
    userId: 1
  },
  {
    id: 3,
    title: '에이트',
    createdAt: `${format(new Date(), 'yyyy-MM-dd HH:mm')}`,
    updatedAt: `${format(new Date(), 'yyyy-MM-dd HH:mm')}`,
    image: '/image/이찬호.png',
    userId: 1
  }
]
