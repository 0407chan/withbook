import { pool } from '../utils/db-connection-handler'
import { Request, Response } from 'express'
import { Book, BookAddType } from '../dto/book.dto'
import { ResultSetHeader } from 'mysql2/promise'
import { format } from 'date-fns'
export const getAllBook = async (req: Request, res: Response) => {
  const dbConnect = await pool.getConnection()
  const query = `select * from withbook.book`
  const resQuery = await dbConnect.query(query)
  dbConnect.release()
  res.json(resQuery[0])
  return
}

export const getBook = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  // console.log(id)
  const dbConnect = await pool.getConnection()
  const query = `select * from withbook.book where id = ${id}`
  const resQuery = await dbConnect.query(query)
  dbConnect.release()
  res.json(resQuery[0])
  return
}

export const addBook = async (req: Request, res: Response) => {
  const dbConnect = await pool.getConnection()
  const book = req.body as BookAddType
  const query = `insert into withbook.book(id,title,createdAt,updatedAt,image) values(null,'${
    book.title
  }','${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}','${format(
    new Date(),
    'yyyy-MM-dd HH:mm:ss'
  )}','')`

  try {
    const insertRes = await dbConnect.query<ResultSetHeader>(query)
    const insertQuery = `select * from withbook.book where id = ${insertRes[0].insertId}`
    const newBook = await dbConnect.query(insertQuery)
    dbConnect.release()
    res.json(newBook[0])
  } catch {
    const insertError = 'insert error'
    res.json(insertError)
  }
}

export const deleteBook = async (req: Request, res: Response) => {
  const dbConnect = await pool.getConnection()
  const id = Number(req.params.id)

  const query = `delete from withbook.book where id = ${id}`

  try {
    const queryRes = await dbConnect.query<ResultSetHeader>(query)
    dbConnect.release()
    console.log(queryRes)
    res.json(id)
  } catch {
    const insertError = -1
    res.json(insertError)
  }
}
