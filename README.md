# API de Produtos - Teste de Software

API REST simples em Node.js com Express para o **Sistema de Gerenciamento de Produtos**, desenvolvida para demonstrar a criação do backend e cobertura de Testes Automatizados (Unitários e Integração) utilizando o **Cypress**.

---

## 🚀 Tecnologias Utilizadas
- **Node.js**
- **Express.js** (Roteamento e Servidor)
- **Cypress** (Motor de testes automatizados E2E e Unitários)

---

## 📦 Estrutura Implementada (Arquitetura)
O projeto segue a divisão em camadas para separar responsabilidades:
- `src/repository/productRepository.js`: Armazenamento de dados do tipo array em memória (gera ID's, busca, salva e deleta).
- `src/services/productService.js`: Regras de negócio (valida se tentaram salvar produto sem nome, ou com preços/estoque negativos).
- `src/controllers/productController.js`: Lida com requisições e respostas HTTP recebidas (retorna 200, 201, 400 ou 404).

### Rotas Disponíveis
Base: `http://localhost:3000/produtos`

| Método | Rota             | Descrição                     |
|--------|------------------|-------------------------------|
| `GET`  | `/produtos`      | Lista todos os produtos       |
| `GET`  | `/produtos/:id`  | Busca um produto específico   |
| `POST` | `/produtos`      | Cria um novo produto          |
| `PUT`  | `/produtos/:id`  | Atualiza dados de um produto  |
| `DELETE`| `/produtos/:id` | Remove um produto do sistema  |

**Estrutura do Produto (JSON):**
```json
{
  "id": 1,
  "nome": "Mouse",
  "preco": 50,
  "estoque": 10
}
```

---

## 🧪 Testes Implementados (Cypress)
A bateria de testes foi configurada para ser validade via console.

1. **Testes Unitários (8 Testes):** Localizados em `cypress/unit/productService.cy.js`. 
   - Validam diretamente o código do serviço (como preço negativo, etc).
2. **Testes de Integração (5 Testes):** Localizados em `cypress/e2e/apiIntegration.cy.js`. 
   - Fazem chamadas HTTP reais na API e garantem o CRUD completo operando as rotas da porta 3000.

---

## 🎬 Como rodar

### Passo 1: Instalações e Preparo 
Abra o terminal na pasta raiz do projeto (`projeto-de-teste`) e instale/garanta as dependências:
```bash
npm install
```

### Passo 2: Inicie a API (Terminal 1)
Você precisa que o seu servidor backend fique rodando em background para os testes de integração alcançarem os endpoints.
```bash
npm start
```
> O terminal deve exibir: `Servidor rodando na porta 3000`. Deixe esse terminal aberto!

### Passo 3: Rode os Testes Cypress (Terminal 2)
Abra **outro terminal** na mesma pasta. Para executar os testes e provar a eficácia, você tem duas opções:

**Opção A - Rodar oculto no terminal (Headless):**
```bash
npx cypress run
```
> O console exibirá a bateria de 13 testes passando um a um (8 units + 5 e2e) com Vzinhos verdes (✓).

**Opção B - Abrir a Interface Gráfica do Cypress:**
```bash
npx cypress open
```
> Uma janela interativa se abrirá. Clique em **"E2E Testing"**, selecione o navegador (ex: Chrome ou Electron) e clique para rodar os arquivos (`productService.cy.js` e `apiIntegration.cy.js`). O painel do próprio cypress fará a prova visual das respostas!
