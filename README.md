# Metas Posto Laranjeiras

Aplicação Next.js + Prisma + Postgres para controle de metas diárias/mensais.

## Requisitos
- Node 18+
- Postgres
- Docker (opcional)

## Variáveis de ambiente
Copie `.env.production.example` para `.env` e preencha `DATABASE_URL` e `JWT_SECRET`.

## Setup local
```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
```

Admin inicial:
- email: admin@posto.com
- senha: admin123

## Deploy no Render (container)
1. Crie um Managed Postgres no Render e pegue a `DATABASE_URL`.
2. Crie um Web Service apontando para este repositório (ou use `render.yaml`).
3. Configure as environment variables: `DATABASE_URL` e `JWT_SECRET`.
4. Build command: `npm install && npx prisma generate && npm run build`
5. Start command: `npm start`

## Notas
- O projeto inclui schema Prisma e seed com admin.
- Altere a senha admin diretamente no DB se desejar.
