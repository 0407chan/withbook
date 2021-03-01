export type BookmarkType = {
  id: number
  bookId: number
  bookpage: number
  title: string
  createdAt?: string
  updatedAt?: string
}

export type BookmarkBodyType = {
  bookId: number
  bookpage: number
  title: string
}
