# IdosoHelp - Admin Dashboard

Painel administrativo web para gerenciar a plataforma IdosoHelp.

## 🚀 Funcionalidades

### Dashboard
- Métricas em tempo real (usuários, faturamento, atendimentos)
- Gráficos de receita e atendimentos por mês
- Atividades recentes da plataforma

### Usuários
- Listar todos os usuários (idosos e profissionais)
- Buscar e filtrar usuários
- Ver status (ativo, inativo, bloqueado)
- Editar e deletar usuários
- Exportar dados

### Financeiro
- Faturamento total e comissões
- Gráficos de receita vs comissão
- Distribuição de receita (IdosoHelp vs Profissionais)
- Histórico de transações
- Exportar relatórios

### Suporte
- Gerenciar tickets de suporte
- Filtrar por status (aberto, em progresso, resolvido)
- Priorizar tickets (alta, média, baixa)
- Categorizar problemas (técnico, cobrança, reclamação)
- Responder e resolver tickets

## 🔐 Autenticação

**Demo Credentials:**
- Email: admin@idosohelp.com
- Senha: admin123

> ⚠️ Em produção, integrar com banco de dados real

## 🛠️ Tecnologias

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Charts**: Recharts
- **Icons**: Lucide React
- **Build**: Vite

## 📦 Instalação

```bash
npm install
```

## 🏃 Desenvolvimento

```bash
npm run dev
```

Acesse em: http://localhost:5173

## 🏗️ Build

```bash
npm run build
```

## 📁 Estrutura

```
src/
├── pages/
│   ├── Login.tsx          # Página de login
│   ├── Dashboard.tsx      # Dashboard principal
│   ├── Users.tsx          # Gerenciamento de usuários
│   ├── Financial.tsx      # Módulo financeiro
│   └── Support.tsx        # Sistema de suporte
├── components/
│   └── Sidebar.tsx        # Navegação lateral
├── App.tsx                # Configuração de rotas
└── main.tsx               # Entry point
```

## 🔗 Integração com Backend

Para conectar com o backend IdosoHelp:

1. Atualizar `src/pages/Login.tsx` para chamar API de autenticação
2. Implementar chamadas HTTP em cada página
3. Usar Axios ou Fetch API
4. Armazenar token JWT no localStorage

Exemplo:
```typescript
const response = await fetch('http://localhost:3000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});
```

## 📊 Dados Mock

Todos os dados atualmente são mock. Para usar dados reais:

1. Substituir arrays de dados por chamadas API
2. Usar React Query ou SWR para cache
3. Implementar paginação
4. Adicionar loading states

## 🚀 Deploy

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### AWS S3 + CloudFront
```bash
npm run build
aws s3 sync dist/ s3://seu-bucket/
```

## 📝 Próximos Passos

- [ ] Integrar com backend real
- [ ] Implementar autenticação com JWT
- [ ] Adicionar paginação
- [ ] Implementar filtros avançados
- [ ] Adicionar dark mode
- [ ] Criar página de configurações
- [ ] Implementar notificações em tempo real (WebSocket)
- [ ] Adicionar testes unitários
- [ ] Melhorar performance (lazy loading, code splitting)

## 💡 Suporte

Para dúvidas ou problemas, entre em contato com o time de desenvolvimento.

---

**Desenvolvido com ❤️ para IdosoHelp**
