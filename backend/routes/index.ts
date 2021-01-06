import appRoot from 'app-root-path'
import { Router } from 'express'
import BookRouter from './book-router'

const router = Router({})

router.get('/hello', (req, res) => {
  res.json('hello world!')
})

router.use('/api/v1/book', BookRouter)

export default router
