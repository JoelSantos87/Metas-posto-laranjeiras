import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  const { email, newPassword } = req.body

  if (!email || !newPassword) {
    return res.status(400).json({ error: 'Email e nova senha são obrigatórios' })
  }

  try {
    // Verifica se o usuário existe
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' })

    // Hash da nova senha
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // Atualiza no banco
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword }
    })

    res.status(200).json({ message: `Senha do usuário ${email} atualizada com sucesso!` })
  } catch (err) {
    console.error('Erro ao resetar senha:', err)
    res.status(500).json({ error: 'Erro interno no servidor' })
  }
}
