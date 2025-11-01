import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import jwt from 'jsonwebtoken'

function parseAuth(req){
  try{ return jwt.verify(req.cookies.auth, process.env.JWT_SECRET) }catch(e){ return null }
}

export default async function handler(req,res){
  const auth = parseAuth(req)
  if(!auth) return res.status(401).json({ error: 'Não autorizado' })

  if(req.method === 'GET'){
    const { month } = req.query
    const targets = await prisma.target.findMany({ where: { yearMonth: month }, orderBy: { day: 'asc' } })
    return res.json(targets)
  }

  if(req.method === 'POST'){
    if(auth.role !== 'ADMIN') return res.status(403).json({ error: 'Somente admin' })
    const { yearMonth, day, value } = req.body
    const t = await prisma.target.create({ data: { yearMonth, day: Number(day), value: Number(value) } })
    return res.json(t)
  }

  res.status(405).end()
}
