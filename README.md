# 🍷 Vine Vino - Backend

API desenvolvida para o marketplace de vinhos **Vine Vino**.  
Responsável pelo gerenciamento de usuários, produtos, carrinho de compras e autenticação.

---

## 📌 Sobre o Projeto

O Vine Vino é um marketplace de vinhos que permite:

- Cadastro e login de usuários  
- Listagem e gerenciamento de vinhos  
- Carrinho de compras  
- Finalização de pedidos  
- Integração com frontend em React  

Esta API foi desenvolvida com foco em boas práticas de organização e arquitetura backend.

---

## 🚀 Tecnologias Utilizadas

- Node.js  
- Express  
- Banco de Dados (MongoDB ou MySQL)  
- JWT (autenticação)  
- Bcrypt (criptografia de senha)  
- Cors  
- Dotenv  

---

## 📂 Estrutura de Pastas

vino-backend/
│
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middlewares/
│   └── config/
│
├── .env
├── server.js
└── package.json

---

## 🔐 Autenticação

O sistema utiliza **JWT (JSON Web Token)** para autenticação.

Fluxo:

1. Usuário faz login  
2. API valida email e senha  
3. Token JWT é gerado  
4. Rotas protegidas exigem token no header:

Authorization: Bearer {token}

---

## 📦 Endpoints Principais

### 👤 Usuários

| Método | Rota        | Descrição              |
|--------|------------|------------------------|
| POST   | /register  | Cadastro de usuário    |
| POST   | /login     | Login                  |
| GET    | /users     | Listar usuários        |

---

### 🍷 Vinhos

| Método | Rota            | Descrição                  |
|--------|----------------|----------------------------|
| GET    | /wines        | Listar vinhos              |
| GET    | /wines/:id    | Buscar vinho por ID        |
| POST   | /wines        | Criar novo vinho           |
| PUT    | /wines/:id    | Atualizar vinho            |
| DELETE | /wines/:id    | Remover vinho              |

---

### 🛒 Carrinho

| Método | Rota           | Descrição                  |
|--------|---------------|----------------------------|
| POST   | /cart         | Adicionar ao carrinho      |
| GET    | /cart         | Listar itens do carrinho   |
| DELETE | /cart/:id     | Remover item               |

---

## ⚙️ Como Rodar o Projeto

### 1️⃣ Clonar o repositório

git clone https://github.com/filipetenorio/vine-vino-backend.git

### 2️⃣ Instalar dependências

npm install

### 3️⃣ Configurar variáveis de ambiente

Criar um arquivo `.env` com:

PORT=3000  
DATABASE_URL=sua_url_do_banco  
JWT_SECRET=sua_chave_secreta  

### 4️⃣ Rodar o servidor

npm run dev  

ou  

node server.js  

---

## 🧠 Conceitos Aplicados

- Arquitetura MVC  
- CRUD completo  
- Middleware de autenticação  
- Hash de senha com Bcrypt  
- Organização modular de rotas  
- Tratamento de erros  
- Validação básica de dados  

---

## 🎯 Objetivo

Projeto desenvolvido com foco em aprendizado e aplicação prática de:

- Desenvolvimento backend  
- Criação de APIs REST  
- Integração com frontend React  
- Estruturação de projetos reais  

---

## 👨‍💻 Autor

Filipe Tenório  
Desenvolvedor Fullstack em formação  
Campina Grande - PB  
