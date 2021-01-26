import { Router } from 'express'
import {
  addBookmark,
  deleteBookmark,
  getAllBookmark,
  getBookmark
} from '../controller/bookmark-controller'

const router = Router({})

router.get('/:id', getBookmark)
router.get('/all/:id', getAllBookmark)
router.post('/', addBookmark)
router.delete('/:id', deleteBookmark)

export default router
