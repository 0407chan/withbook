import { Router } from 'express'
import { getAllBook } from '../services/book-service'

const router = Router({})

router.get('/', getAllBook)

export default router
