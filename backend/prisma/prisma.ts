/* eslint-disable @typescript-eslint/no-explicit-any */

import { PrismaClient } from '@prisma/client'

// let prisma: PrismaClient

// // Fix endless prisma client re-initialization on every HMR
// // Related issue https://github.com/prisma/prisma/issues/1983#issuecomment-620621213
// if (process.env.NODE_ENV === 'development') {
//   if (!(global as any).prisma) {
//     (global as any).prisma = new PrismaClient()
//     // ;(global as any).prisma.$on('beforeExit' as never, async () => {
//     //   await prisma.$disconnect()
//     // })
//   }

//   prisma = (global as any).prisma
// } else {
//   prisma = new PrismaClient()
//   // prisma.$on('beforeExit' as never, async () => {
//   //   await prisma.$disconnect()
//   // })
// }

// export { prisma }

export const prisma = new PrismaClient()
