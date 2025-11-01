import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import jwt from 'jsonwebtoken'

function parseAuth(req){
  try{ return jwt.verify(req.cookies.auth, process.env.JWT_SECRET) }catch(e){ return null }
}

export default async function handler(req,res){
  const auth = parseAuth(req)
  if(!auth) return res.status(401).json({ error: 'Não autorizado' })

  if(req.method === 'POST'){
    const { date, value } = req.body
    const r = await prisma.record.create({ data: { userId: auth.userId, date: new Date(date), value: Number(value) } })
    return res.json(r)
  }

  if(req.method === 'GET'){
    const { userId, date } = req.query
    const where = {}
    if(userId) where.userId = Number(userId)
    if(date) where.date = new Date(date)
    const records = await prisma.record.findMany({ where })
    return res.json(records)
  }

  res.status(405).end()
}
