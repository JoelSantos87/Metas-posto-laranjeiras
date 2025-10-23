// topo do prisma/seed.js
require('dotenv').config(); // garante que process.env.DATABASE_URL existe
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();


async function main() {
  // --- Usuário Admin ---
  const adminEmail = 'admin@posto.com';
  const adminPassword = 'admin123';
  const adminName = 'Administrador';

  const adminHash = await bcrypt.hash(adminPassword, 10);
  
  console.log('DATABASE_URL:', process.env.DATABASE_URL);
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      name: adminName,
      password: adminHash,
      role: 'ADMIN',
    },
    create: {
      name: adminName,
      email: adminEmail,
      password: adminHash,
      role: 'ADMIN',
    },
  });

  // --- Usuário Funcionário de teste ---
  const empEmail = 'funcionario@posto.com';
  const empPassword = 'func123';
  const empName = 'Funcionario Teste';

  const empHash = await bcrypt.hash(empPassword, 10);

  await prisma.user.upsert({
    where: { email: empEmail },
    update: {
      name: empName,
      password: empHash,
      role: 'EMPLOYEE',
    },
    create: {
      name: empName,
      email: empEmail,
      password: empHash,
      role: 'EMPLOYEE',
    },
  });

  console.log('✅ Seed completa: Admin e Funcionário criados/atualizados.');
}

main()
  .catch((e) => {
    console.error('Erro no seed:', e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

