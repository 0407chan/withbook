export type FetchBookType = {
  authors: string[]
  contents: string
  isbn: string
  dateTime: string
  price: number
  publisher: string
  sale_price: number
  status: string
  thumbnail: string
  title: string
  translators: string[]
  url: string
}

export type BookType = {
  id: number
  title: string
  createdAt: string
  updatedAt: string
  image?: string
  userId?: number
  bookmarkList?: BookMark
}

export type BookMark = {
  id: number
  bookId: number
  title: string
  bookPage: number
  createdAt: string
  updatedAt: string
  commentList?: Comment
}

export type Comment = {
  id: number
  content: string
  createdAt: string
  updatedAt: string
  writer: string
}
export type BookAddType = {
  title: string
}
