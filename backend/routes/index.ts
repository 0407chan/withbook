import appRoot from 'app-root-path'
import { Router } from 'express'

const router = Router({})

router.get('/hello', (req, res) => {
  res.json('hello world!')
})

router.get('/', (req, res) => {
  res.sendFile(appRoot.resolve('/public/index.html'))
})

export default router
