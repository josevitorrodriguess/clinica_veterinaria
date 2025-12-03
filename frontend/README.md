# Clínica Veterinária – Frontend

Frontend Next.js 14 (App Router) em TypeScript com Tailwind (tema emerald + slate) para o painel interno da clínica veterinária. Inclui autenticação client-side, layouts protegidos, componentes reutilizáveis e rotas estruturadas conforme o escopo solicitado.

## Scripts
- `npm run dev` – modo desenvolvimento
- `npm run build` – build de produção
- `npm run start` – inicia servidor após build
- `npm run lint` – verificação de lint

## Estrutura
- `src/app` – rotas do App Router (login público e layout protegido `(dashboard)`)
- `src/components` – layout (Sidebar/Topbar) e UI (Button, Card, Input, Section)
- `src/context/AuthContext.tsx` – controle de sessão e token em `localStorage`
- `src/lib/api.ts` – dados mockados e funções de CRUD fake
- `src/styles/utils.css` – utilitários de layout

## Observações
- Rotas dentro de `(dashboard)` redirecionam para `/login` se não houver token.
- Dados são mockados localmente (sem backend); login retorna token fictício.
