# Sistema de Gerenciamento de Produtos - Teste de Software

Este projeto consiste em uma aplicação completa (API REST + Frontend) desenvolvida para a disciplina de **Teste de Software**. O objetivo principal é demonstrar a aplicação prática de diferentes níveis de testes automatizados utilizando o framework **Cypress**.

---

## 🚀 Tecnologias e Arquitetura

O sistema foi construído com uma separação clara de responsabilidades:

- **Backend:** Node.js com Express.js.
- **Frontend:** Interface rica em HTML5, CSS3 e JavaScript Vanilla.
- **Persistência:** Dados em memória (Array) para agilidade nos testes.
- **Arquitetura:** Divisão em camadas (Controller, Service, Repository) para facilitar o isolamento dos testes.

### Descrição das Camadas
- `src/repository/productRepository.js`: Gerenciamento direto do array de dados (CRUD).
- `src/services/productService.js`: Camada de regras de negócio e validações lógicas.
- `src/controllers/productController.js`: Manipulação de entradas e saídas HTTP (Status Codes).

---

## 🎨 Interface Gráfica (Dashboard)

A aplicação possui uma interface web funcional acessível em `http://localhost:3000`. Através dela, é possível realizar toda a gestão de produtos com feedback visual em tempo real:
- **Criação e Edição:** Formulário dinâmico com alternância de métodos (POST/PUT).
- **Lista de Produtos:** Tabela sincronizada via chamadas assíncronas (GET).
- **Exclusão:** Botões de remoção rápida (DELETE).
- **Feedback Visual:** Alertas verdes para sucessos e alertas vermelhos para erros de validação retornados pela API.

---

## 🧪 Cobertura Total de Testes (18 Cenários)

Abaixo estão listados todos os testes implementados, divididos por categoria seguindo a Pirâmide de Testes.

### 1. Testes Unitários (8 Testes)
Local: `cypress/unit/productService.cy.js`
- **Teste 1:** Valida que o sistema exige o nome do produto.
- **Teste 2:** Valida o bloqueio de produtos com preço negativo.
- **Teste 3:** Valida o bloqueio de produtos com estoque negativo.
- **Teste 4:** Confirma a criação correta de um produto com dados válidos.
- **Teste 5:** Valida que a atualização não permite preços negativos.
- **Teste 6:** Valida o erro ao tentar atualizar um produto inexistente.
- **Teste 7:** Confirma a atualização bem-sucedida de estoque e preço.
- **Teste 8:** Valida se a listagem retorna um array populado corretamente.

### 2. Testes de Integração API (5 Testes)
Local: `cypress/e2e/apiIntegration.cy.js`
- **Teste 1:** Executa um `POST` real e verifica o status 201 e o objeto criado.
- **Teste 2:** Executa um `GET` e valida a estrutura da lista de produtos.
- **Teste 3:** Executa um `GET` por ID e confirma a integridade dos dados retornados.
- **Teste 4:** Executa um `PUT` e valida se a alteração persiste no banco de dados.
- **Teste 5:** Executa um `DELETE` e valida o status 204, seguido de um `GET` que deve retornar 404.

### 3. Testes E2E Visuais (5 Testes)
Local: `cypress/e2e/frontendUI.cy.js`
- **Teste 1:** Verifica se todos os elementos da interface estão visíveis no carregamento.
- **Teste 2:** Simula um usuário digitando e cadastrando um produto, validando a aparição na tabela.
- **Teste 3:** Simula o clique no botão de exclusão e verifica a remoção visual da linha.
- **Teste 4:** Força um erro de preço negativo no formulário e valida a exibição da **caixa de erro vermelha**.
- **Teste 5:** Força um erro de estoque negativo e valida se a interface exibe a mensagem correta ao usuário.

---

## 🎬 Guia de Inicialização Passo a Passo

Siga exatamente estes passos para rodar o projeto em sua máquina:

### 1. Preparação do Ambiente
Abra o terminal na pasta raiz do projeto e instale as dependências necessárias:
```bash
npm install
```

### 2. Executar o Servidor (API + Frontend)
Inicie a aplicação. O servidor precisa estar rodando para que os testes de integração e interface funcionem:
```bash
npm start
```
> Você verá a mensagem: `Servidor rodando na porta 3000`. **Mantenha este terminal aberto.**

### 3. Abrir o Dashboard do Cypress
Em um **novo terminal**, abra a interface interativa do Cypress para acompanhar os testes:
```bash
npx cypress open
```
Na janela que abrir:
1. Escolha **E2E Testing**.
2. Selecione o navegador de sua preferência (ex: Chrome).
3. Clique em **Start E2E Testing**.
4. Clique em qualquer um dos arquivos de spec para ver os testes rodando em tempo real.

---

## 👨‍🏫 Dica para Apresentação
Para uma demonstração técnica impecável, consulte o arquivo **[roteiro_apresentacao.md](./roteiro_apresentacao.md)** na raiz do projeto.

