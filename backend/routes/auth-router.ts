import { Router } from 'express'
import { registerUser } from '../controller/auth-controller'

const router = Router({})

router.post('/register', registerUser)

export default router
