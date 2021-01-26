export type BookmarkDto = {
  id: number
  bookId: number
  title: string
  bookPage: number
  createdAt?: string
  updatedAt?: string
  commentList?: Comment
}

export type BookmarkBodyDto = {
  bookId: number
  title: string
  bookpage: number
}

export type Comment = {
  id: number
  content: string
  createdAt: string
  updatedAt: string
  writer: string
}
