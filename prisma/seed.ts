import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main(){
  const pass = await bcrypt.hash('3007', 10)
  await prisma.user.upsert({
    where: { email: 'joelbds87@gmail.com' },
    update: {},
    create: { name: 'Admin', email: 'joelbds87@gmail.com', password: pass, role: 'ADMIN' }
  })
  console.log('Seed done')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(()=> prisma.$disconnect())
