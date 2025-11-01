import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req,res){
  const { auth } = req.cookies
  if(!auth) return res.status(200).json({ user: null })
  try{
    const data = jwt.verify(auth, process.env.JWT_SECRET)
    const user = await prisma.user.findUnique({ where: { id: data.userId }, select: { id:true, name:true, email:true, role:true } })
    res.json({ user })
  }catch(e){ res.status(200).json({ user: null }) }
}
