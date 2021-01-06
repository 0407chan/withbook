import { pool } from '../utils/db-connection-handler'
import { Request, Response } from 'express'

export const getAllBook = async (req: Request, res: Response) => {
  const dbConnect = await pool.getConnection()
  const resQuery = await dbConnect.query('select * from withbook.book')
  res.json(resQuery[0])
  return
}
