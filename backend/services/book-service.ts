import { pool } from '../utils/db-connection-handler'
import { Request, Response } from 'express'
import { Book, BookAddType } from '../dto/book.dto'
import { ResultSetHeader } from 'mysql2/promise'

export const getAllBook = async (req: Request, res: Response) => {
  const dbConnect = await pool.getConnection()
  const query = `select * from withbook.book`
  const resQuery = await dbConnect.query(query)
  dbConnect.release()
  res.json(resQuery[0])
  return
}

export const addBook = async (req: Request, res: Response) => {
  const dbConnect = await pool.getConnection()
  const book = req.body as BookAddType
  const query = `insert into withbook.book(id,title) values(null,'${book.title}')`

  try {
    const insertRes = await dbConnect.query<ResultSetHeader>(query)
    const newBook: Book = {
      id: insertRes[0].insertId,
      title: book.title
    }
    dbConnect.release()
    res.json(newBook)
  } catch {
    const insertError = 'insert error'
    res.json(insertError)
  }
}

export const deleteBook = async (req: Request, res: Response) => {
  const dbConnect = await pool.getConnection()
  const bookId = Number(req.query.id)

  const query = `delete from withbook.book where id = ${bookId}`

  try {
    const queryRes = await dbConnect.query<ResultSetHeader>(query)
    dbConnect.release()
    console.log(queryRes)
    res.json(bookId)
  } catch {
    const insertError = -1
    res.json(insertError)
  }
}
