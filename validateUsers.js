import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

// Senhas de teste correspondentes aos seeds
const testPasswords = {
  'admin@posto.com': 'admin123',
  'employee@posto.com': 'employee123',
  'novoadmin@posto.com': 'novaSenha123',
  'novoemployee@posto.com': 'func123'
}

async function main() {
  try {
    const users = await prisma.user.findMany()
    console.log('🔹 Usuários no banco:\n')

    for (const user of users) {
      const testPassword = testPasswords[user.email]
      let passwordOk = 'não testado'

      if (testPassword) {
        passwordOk = await bcrypt.compare(testPassword, user.password) ? 'OK' : 'Incorreta'
      }

      console.log(`- ${user.email} | Role: ${user.role} | Senha teste: ${passwordOk}`)
    }

    if (users.length === 0) {
      console.log('❌ Nenhum usuário encontrado. Seed não rodou ou banco errado.')
    }
  } catch (err) {
    console.error('Erro ao validar usuários:', err)
  } finally {
    await prisma.$disconnect()
  }
}

main()
