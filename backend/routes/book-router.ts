import { Router } from 'express'
import {
  getAllBook,
  addBook,
  getBook,
  deleteBook
} from '../services/book-service'

const router = Router({})

router.get('/:id', getBook)
router.get('/', getAllBook)
router.post('/', addBook)
router.delete('/:id', deleteBook)

export default router
