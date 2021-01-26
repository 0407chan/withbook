import { BookmarkDto } from './bookmark.dto'

export type BookType = {
  id: number
  title: string
  createdAt: string
  updatedAt: string
  image?: string
  userId?: number
  bookmarkList?: BookmarkDto
}

export type BookAddType = {
  title: string
  image?: string
}
