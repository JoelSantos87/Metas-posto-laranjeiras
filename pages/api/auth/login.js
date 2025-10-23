import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
const prisma = new PrismaClient()

export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).end()
  const { email, password } = req.body
  const user = await prisma.user.findUnique({ where: { email } })
  if(!user) return res.status(401).json({ error: 'Credenciais inválidas' })
  const ok = await bcrypt.compare(password, user.password)
  if(!ok) return res.status(401).json({ error: 'Credenciais inválidas' })
  const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' })
  res.setHeader('Set-Cookie', cookie.serialize('auth', token, { httpOnly: true, path: '/', maxAge: 60*60*24*7 }))
  res.json({ id: user.id, name: user.name, role: user.role })
}
