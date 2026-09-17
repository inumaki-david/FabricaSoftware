# SGAlmoxarifado — Sistema de Gerenciamento de Almoxarifado

Sistema moderno para controle de inventário, auditoria de movimentações e gestão de suprimentos em almoxarifados, construído com **React**, **Tailwind CSS**, **Vite** e **json-server** (Mock REST API).

---

## 🛠️ Tecnologias Utilizadas

- **Front-end**:
  - React 19 (Hooks: `useState`, `useEffect`, `useMemo`)
  - Vite
  - Tailwind CSS v4
  - Lucide React (Ícones e indicadores visuais)
  - Axios (Cliente HTTP)
- **Back-end Mock**:
  - `json-server` (API REST simulada com dados em `Backend/db.json`)

---

## 📋 Entidades de Dados (`db.json`)

1. **`usuarios`**: Representa os operadores e gestores do almoxarifado (`id`, `nome`, `cargo`).
2. **`produtos`**: Itens e materiais disponíveis em estoque (`id`, `nome`, `sku`, `quantidade_estoque`).
3. **`movimentacoes`**: Histórico de auditoria de transferências (`id`, `produto_id`, `usuario_id`, `tipo` ['entrada'|'saida'], `quantidade_movimentada`, `data`).

---

## 🧠 Regras de Negócio Implementadas no Front-end

Como o `json-server` não possui transações de banco de dados nativas, o Front-end gerencia a consistência:
- **Entrada (Reposição)**:
  1. Cria o registro de histórico (`POST /movimentacoes`).
  2. Atualiza o saldo do produto somando a quantidade movimentada (`PATCH /produtos/:id`).
- **Saída (Retirada)**:
  1. **Validação de Saldo**: O sistema valida se `quantidade_movimentada <= quantidade_estoque`. Se a quantidade solicitada for maior que o saldo atual, a operação é **bloqueada imediatamente** com alerta em tela.
  2. Cria o registro de histórico (`POST /movimentacoes`).
  3. Atualiza o saldo do produto subtraindo a quantidade movimentada (`PATCH /produtos/:id`).

---

## 🚀 Como Executar o Projeto

Abra dois terminais na pasta raiz do projeto:

### 1. Iniciar a API Mock (json-server)
```bash
npx json-server --watch Backend/db.json --port 3001
```
> Endpoints disponíveis em: `http://localhost:3001` (`/produtos`, `/usuarios`, `/movimentacoes`).

### 2. Iniciar o Front-end (React)
```bash
cd frontend
npm install
npm run dev
```
> Acesse a interface no seu navegador em: `http://localhost:5173`.

---

## 📂 Estrutura de Arquivos

```text
SGAlmoxarifado/
├── Backend/
│   └── db.json                   # Base de dados simulada
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Cabeçalho e navegação por abas
│   │   │   ├── DashboardStats.jsx# Métricas e indicadores em tempo real
│   │   │   ├── ListaProdutos.jsx # Tabela de produtos com busca e filtros
│   │   │   ├── FormularioMovimentacao.jsx # Regra de negócio de Entrada e Saída
│   │   │   ├── HistoricoMovimentacoes.jsx # Auditoria com cruzamento de dados
│   │   │   └── ModalNovoProduto.jsx       # Cadastro de novos itens
│   │   ├── services/
│   │   │   └── api.js            # Chamadas REST com Axios
│   │   ├── App.jsx               # Orquestração do estado e sincronização
│   │   ├── index.css             # Estilos globais e Tailwind v4
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```
