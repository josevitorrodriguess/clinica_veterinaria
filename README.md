# Clinica Veterinaria

Guia rapido para subir o backend (Express + Prisma + PostgreSQL) e o frontend (Next.js 14) da aplicacao.

## Requisitos
- Node.js 18+ e npm
- Docker e Docker Compose (para o banco)
- Portas padrao: 3000 (frontend), 3001 (API), 5434 (Postgres via docker-compose)

## 1. Banco de dados
1. Opcional: ajuste as credenciais em `.env` na raiz (usado pelo docker-compose):
   - POSTGRES_USER=clinica_user
   - POSTGRES_PASSWORD=clinica_password
   - POSTGRES_DB=clinica_db
2. Inicie o Postgres com Docker na raiz do projeto:
   - `docker-compose up -d`
3. Para ver logs do banco: `docker-compose logs -f postgres`

## 2. Backend (pasta `server/`)
1. Crie o arquivo `server/.env` (exemplo):
   - DATABASE_URL=postgresql://clinica_user:clinica_password@localhost:5434/clinica_db?schema=public
   - JWT_SECRET=troque-esta-chave
   - PORT=3001
2. Instale dependencias e prepare o Prisma:
   - `cd server`
   - `npm install`
   - `npx prisma generate`
   - `npx prisma migrate deploy` (aplica as migracoes existentes)
3. Rode em desenvolvimento:
   - `npm run dev`
4. API disponivel em `http://localhost:3001`. Teste rapido: `curl http://localhost:3001/ping`.

## 3. Frontend (pasta `frontend/`)
1. Crie `frontend/.env` (exemplo):
   - NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
2. Instale dependencias e suba o app:
   - `cd frontend`
   - `npm install`
   - `npm run dev`
3. Acesse em `http://localhost:3000`.

## Fluxo rapido (tudo local)
1) `docker-compose up -d`
2) Backend: criar `.env`, `npm install`, `npx prisma migrate deploy`, `npm run dev` (porta 3001)
3) Frontend: criar `.env`, `npm install`, `npm run dev` (porta 3000)

## Dicas e manutencao
- Reiniciar banco do docker: `docker-compose down -v` (remove volume de dados).
- Ver dados via Prisma Studio: `cd server && npx prisma studio`.
- Ao alterar `schema.prisma`, gere nova migracao: `npx prisma migrate dev --name <mensagem>` e depois `npx prisma generate`.
