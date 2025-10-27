# Payment API

API RESTful para processamento de pagamentos, construída com NestJS e TypeScript. O projeto oferece endpoints para gerenciar clientes e cobranças, suportando múltiplos métodos de pagamento e garantindo a consistência dos dados através de transações e chaves de idempotência.

## ✨ Funcionalidades

- **Gerenciamento de Clientes (CRUD)**: Endpoints para criar, listar, buscar, atualizar e remover clientes.
- **Gerenciamento de Cobranças (CRUD)**: Endpoints para criar, listar, buscar, atualizar e remover cobranças.
- **Múltiplos Métodos de Pagamento**:
  - Cartão de Crédito
  - Boleto Bancário
  - Pagamento Instantâneo (PIX)
- **Idempotência**: Uso do header `idempotency-key` em operações de criação e atualização para prevenir requisições duplicadas e garantir que uma operação seja executada apenas uma vez.
- **Transações de Banco de Dados**: Operações complexas, como a atualização de um método de pagamento, são executadas dentro de uma transação para garantir a atomicidade e a integridade dos dados.
- **Validação de Dados**: Uso de `class-validator` para validar os dados de entrada e garantir que apenas informações válidas sejam processadas.
- **Documentação de API**: Geração automática de documentação interativa com Swagger, acessível em `/api`.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **NestJS**: Framework Node.js progressivo para construir aplicações eficientes e escaláveis.
= **Husky**: Para validar lint ao commitar.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **TypeORM**: ORM para TypeScript e JavaScript.
- **PostgreSQL**: Banco de dados relacional (ou outro de sua preferência compatível com TypeORM).
- **Swagger**: Ferramenta para documentação de APIs.
- **class-validator**: Para validação de DTOs.

---

## 🚀 Como Rodar o Projeto

Siga os passos abaixo para configurar e executar o projeto em seu ambiente local.

### Pré-requisitos

- Node.js (versão 16 ou superior)
- NPM ou Yarn
- Um banco de dados PostgreSQL rodando (ou Docker).

### 1. Clone o Repositório

```bash
git clone https://github.com/franwanderley/payment
cd payment
```

### 2. Instale as Dependências

```bash
npm install
```
### 3. Crie um banco de dados

Crie um banco de dados com o nome payment_db no seu postgres.

```bash
# (Exemplo de comando, pode variar conforme sua configuração)
npm run typeorm:migration:run
```

### 4. Configure as Variáveis de Ambiente

Crie um arquivo chamado `.env` na raiz do projeto, copiando o conteúdo de `.env.example` (se houver) ou usando o modelo abaixo.

```env
# Configurações da Aplicação
PORT=3333

# Configurações do Banco de Dados (PostgreSQL)
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=sua_senha_secreta
DB_DATABASE=payment_db
```

### 5. Inicie a Aplicação

```bash
# Modo de desenvolvimento com hot-reload
npm run start:dev
```

### 6. Acesse a Documentação

Com a aplicação rodando, acesse a documentação da API em seu navegador:

**http://localhost:3333/api**

A partir daí, você pode explorar e testar todos os endpoints disponíveis.
