# 🚀 Desafio Técnico Fullstack - CRUD com NestJS e Next.js  

## 📌 Sobre o Desafio  

Este desafio técnico tem como objetivo avaliar a capacidade de desenvolvimento **fullstack**, utilizando **NestJS** no backend e **Next.js** no frontend. A aplicação consiste em um sistema de gerenciamento de usuários, permitindo operações de **CRUD (Create, Read, Update, Delete)**, garantindo a integridade dos dados e a experiência do usuário.  

---

## 🎯 Requisitos do Projeto  

### ✅ **Backend - API REST com NestJS**  
- Desenvolver uma API utilizando **NestJS**.  
- Utilizar um banco de dados relacional.  
- Implementar um **CRUD** para usuários com os seguintes campos:  
  - `id` (UUID gerado automaticamente).  
  - `name` 
  - `surname`
  - `age` 
  - `email`  
  - `cpf`  
- Implementar **E-mail e CPF não sejam duplicados**.  
- Utilizar **ORM** (mapeamento objeto-relacional). 

### ✅ **Frontend - Interface com Next.js**  
- Desenvolver a interface utilizando **React + Next.js**.  
- Criar um layout responsivo e intuitivo.  
- Implementar uma listagem de usuários.  
- Criar um formulário para **cadastro e edição de usuários**.  
- Implementar funcionalidade para **excluir usuários**.  
- Exibir mensagens de erro caso **Email ou CPF já estejam cadastrados**.  

---

## 🛠 Tecnologias Utilizadas  

### **Backend (API REST)**
- **NestJS**  
- **TypeScript**  
- **Prisma**  
- **PostgreSQL**  

### **Frontend**
- **Next.js**  
- **TypeScript**  
- **React Hooks & Context API**  
- **Fetch API** (para consumo da API)  

---

## 🚀 Como Rodar o Projeto  

### 🔧 **Pré-requisitos**
Antes de iniciar, certifique-se de ter instalado na sua máquina:  
- [Node.js](https://nodejs.org/) (versão 16+ recomendada)  
- [NestJS](https://nestjs.com/) (opcional, para rodar o banco de dados)  
- [PostgreSQL](https://www.postgresql.org/) (caso prefira rodar o banco localmente)  

---

### ⚙️ **Rodando o Backend (NestJS)**  

```bash
# Clone este repositório
git clone https://github.com/seu-usuario/desafio-fullstack.git

# Acesse o diretório do backend
cd backend

# Instale as dependências
npm install

# Copie o arquivo de variáveis de ambiente
cp .env.example .env

# Configure seu banco de dados no arquivo .env

# Rodando as migrations (caso use TypeORM ou Prisma)
npx prisma migrate dev  # ou

# Inicie a API
npm run dev
```
A API rodará em **http://localhost:3001**.  

---

### 💻 **Rodando o Frontend (Next.js)**  

```bash
# Acesse o diretório do frontend
cd frontend

# Instale as dependências
npm install

# Inicie o servidor Next.js
npm run dev
```
O frontend estará disponível em **http://localhost:3000**.  

---

## 🔍 API - Endpoints  

| Método  | Rota         | Descrição                      |
|---------|-------------|--------------------------------|
| `GET`   | `/users`    | Lista todos os usuários        |
| `GET`   | `/users/:id`| Obtém um usuário pelo ID       |
| `POST`  | `/users`    | Cadastra um novo usuário       |
| `PATCH` | `/users/:id`| Atualiza um usuário existente  |
| `DELETE`| `/users/:id`| Remove um usuário do sistema   |

📌 **Nota:** Caso tente cadastrar um usuário com **E-mail ou CPF já cadastrados**, a API retornará um erro.
