import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('3007', 10)

  await prisma.user.upsert({
    where: { email: 'joelbds87@gmail.com' },
    update: {},
    create: {
      email: 'joelbds87@gmail.com',
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
