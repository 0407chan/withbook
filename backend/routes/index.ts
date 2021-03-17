import { Router } from 'express'
import AuthRouter from './auth-router'
import BookRouter from './book-router'
import BookmarkRouter from './bookmark-router'

const router = Router({})

router.use('/api/v1/book', BookRouter)
router.use('/api/v1/bookmark', BookmarkRouter)
router.use('/api/v1/auth', AuthRouter)

export default router
