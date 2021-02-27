import { format } from 'date-fns'
import { Request, Response } from 'express'
import { ResultSetHeader } from 'mysql2/promise'
import { BookmarkBodyDto } from '../dto/bookmark.dto'
import { pool } from '../utils/db-connection-handler'
export const getAllBookmark = async (req: Request, res: Response) => {
  const dbConnect = await pool.getConnection()
  const bookId = Number(req.params.id)
  const query = `select * from withbook.bookmark where bookId=${bookId} order by bookpage`
  const resQuery = await dbConnect.query(query)
  dbConnect.release()
  res.json(resQuery[0])
  return
}

export const getBookmark = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  // console.log(id)
  const dbConnect = await pool.getConnection()
  const query = `select * from withbook.bookmark where id = ${id}`
  const resQuery = await dbConnect.query(query)
  dbConnect.release()
  res.json(resQuery[0])
  return
}

export const addBookmark = async (req: Request, res: Response) => {
  const dbConnect = await pool.getConnection()
  const { bookId, bookpage, title } = req.body as BookmarkBodyDto
  const query = `INSERT INTO withbook.bookmark SET ?`
  const params = {
    id: null,
    bookId: bookId,
    createdAt: `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`,
    updatedAt: `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`,
    bookpage: bookpage,
    title: `${title}`
  }
  try {
    const insertRes = await dbConnect.query<ResultSetHeader>(query, params)
    const insertQuery = `select * from withbook.bookmark where id = ${insertRes[0].insertId}`
    const newBookmark = await dbConnect.query(insertQuery)
    dbConnect.release()
    res.json(newBookmark[0])
  } catch {
    const insertError = 'insert error'
    res.status(502).json(insertError)
  }
}

export const deleteBookmark = async (req: Request, res: Response) => {
  const dbConnect = await pool.getConnection()
  const id = Number(req.params.id)

  const query = `delete from withbook.bookmark where id = ${id}`

  try {
    const queryRes = await dbConnect.query<ResultSetHeader>(query)
    dbConnect.release()
    console.log(queryRes)
    res.json(id)
  } catch {
    const deleteError = -1
    res.json(deleteError)
  }
}
