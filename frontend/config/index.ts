import type { BookType, Comment } from '../types'
import { format } from 'date-fns'

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

export const DUMMY_COMMENT: Comment[] = [
  {
    id: 1,
    content: '너무재미있네요 이책',
    createdAt: format(new Date(), 'yyyy-MM-dd HH:mm'),
    updatedAt: format(new Date(), 'yyyy-MM-dd HH:mm'),
    writer: '이찬호'
  },
  {
    id: 2,
    content: '핵꿀 개꿀',
    createdAt: format(new Date(), 'yyyy-MM-dd HH:mm'),
    updatedAt: format(new Date(), 'yyyy-MM-dd HH:mm'),
    writer: '삼찬호'
  }
]
