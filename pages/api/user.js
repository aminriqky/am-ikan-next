// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler (req, res) {
  const allUsers = await prisma.user.findMany()
  res.status(200).json(allUsers)
}
