import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main(){
  const pass = await bcrypt.hash('admin123', 10)
  await prisma.user.upsert({
    where: { email: 'admin@posto.com' },
    update: {},
    create: { name: 'Admin', email: 'admin@posto.com', password: pass, role: 'ADMIN' }
  })
  console.log('Seed done')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(()=> prisma.$disconnect())
