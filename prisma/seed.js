import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10)

  await prisma.user.upsert({
    where: { email: 'admin@posto.com' },
    update: {},
    create: {
      email: 'admin@posto.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  console.log('✅ Usuário admin criado com sucesso!')
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e)
    prisma.$disconnect()
  })
