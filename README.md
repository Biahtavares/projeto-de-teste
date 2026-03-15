# API de Produtos

API REST simples em Node.js/Express para gerenciar produtos. Atualmente as rotas respondem com mensagens de placeholder, prontas para você conectar às camadas de serviço e repositório.

## Pré-requisitos
- Node.js 18+ (recomendado)
- npm (vem com o Node)

## Instalação
```bash
npm install
```

## Execução
- Desenvolvimento (com reload via nodemon):
```bash
npm run dev
```
- Produção/local simples:
```bash
npm start
```

Servidor inicia em `http://localhost:3000`.

## Rotas atuais
Base: `/produtos`

- `GET /produtos` → listar produtos
- `GET /produtos/:id` → buscar um produto
- `POST /produtos` → criar produto
- `PUT /produtos/:id` → atualizar produto
- `DELETE /produtos/:id` → deletar produto

> Todas as rotas retornam apenas mensagens estáticas até a camada de serviço/repositório ser implementada.

## Estrutura de pastas
```
src/
  server.js            # inicializa o Express e monta rotas
  routes/productRoutes.js
  controllers/productController.js
  services/productService.js
  repository/productRepository.js
```

## Próximos passos sugeridos
- Implementar regras de negócio em `src/services/productService.js`.
- Conectar a uma base de dados em `src/repository/productRepository.js`.
- Adicionar validação de entrada e tratamento de erros nas rotas.
- Criar testes (ex.: com Cypress para e2e e Jest/supertest para API).
