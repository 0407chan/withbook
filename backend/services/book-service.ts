import { pool } from '../utils/db-connection-handler'

export const getAllBook = async () => {
  const dbConnect = await pool.getConnection()
  const res = await dbConnect.query('select * from withbook.book')

  console.log(res[0])
}
