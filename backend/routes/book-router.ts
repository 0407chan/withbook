import { Router } from 'express'
import { getAllBook, addBook, deleteBook } from '../services/book-service'

const router = Router({})

router.get('/', getAllBook)
router.post('/', addBook)
router.delete('/', deleteBook)

export default router
