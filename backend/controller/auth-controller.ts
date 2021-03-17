import { Request, Response } from 'express'
import { prisma } from '../prisma/prisma'

export const registerUser = async (req: Request, res: Response) => {
  let registerUserPayload
  try {
    registerUserPayload = await prisma.user.create({
      data: { username: 'chanho2', password: '1234' }
    })
  } catch (err) {
    res.status(501).json({ message: '회원가입 에러', error: err })
  }

  if (registerUserPayload) {
    console.log(registerUserPayload)
    res.status(200).json(registerUserPayload)
    return
  }
}
