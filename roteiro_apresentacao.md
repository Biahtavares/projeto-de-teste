# Roteiro de Apresentação: Protagonismo do Cypress

Este roteiro inverte a ordem natural de uma apresentação de desenvolvimento. Como a disciplina é "**Teste de Software**", você vai abrir a apresentação com a ferramenta oficial (Cypress) mostrando sua suíte, seus conceitos e rodando os arquivos. Apenas no final usaremos o navegador web para a "Prova Prática".

---

## 🚀 1. O Palco: A Bateria de Testes (Cypress Aberto)

> *Abra sua apresentação já com a janela gráfica do Cypress rodando (`npx cypress open`).*

**Fale para o professor:**
> *"Escolhemos desenvolver um Sistema de Gerenciamento de Produtos inteiro, de ponta a ponta (API REST, Negócio, Interface), com um único objetivo: Submeter cada camada da aplicação à suíte rigorosa de testes usando o Cypress."*

Mostre os 3 arquivos listados na tela do seu Cypress (na aba "Specs") e explique a **Arquitetura em Pirâmide** que você construiu:
1. **`productService.cy.js` (Testes Unitários da base)**: Testam matemática e lógica pura. O Cypress entra diretamente no código e prova que a função do sistema não aceita Lixo (ex: preços negativos).
2. **`apiIntegration.cy.js` (Testes de Integração do Meio)**: Aqui o Cypress atua testando a comunicação do servidor com simulação de POST/GET/PUT.
3. **`frontendUI.cy.js` (Testes E2E Visual)**: No topo da pirâmide, o Cypress atinge a perfeição abrindo as telas do HTML e clicando lá dentro, como se fosse um humano validando o resultado visual.

---

## 🧪 2. Rodando os Testes ao Vivo e Vendo a "Magia"

### Etapa 2.A: Testando Unidades (O código funciona sozinho?)
1. Clique em **`productService.cy.js`**. 
2. Acompanhe com o professor os `✔ checks verdes` descendo rápido, são 8 testes essenciais:
   - **Explique o Teste 1, 2 e 3:** *"Eles avaliam o bloqueio de produtos sem nome, e a inserção de preços ou estoques negativos. A máquina foi forçada a errar, e o teste validou nossa segurança."*
   - **Explique o Teste 4:** *"Garante o caminho feliz, salvando um produto válido e retornando a criação do ID."*
   - **Explique o Teste 5 e 6:** *"Validações na Atualização (PUT). Ele recusa atualizar algo pra preço negativo, e solta erro 404 se eu pedir pra ele alterar um ID falso (9999)."*
   - **Explique o Teste 7 e 8:** *"Testam fluxo natural de atualização e listagem garantindo que tudo chegue em formato Array puro."*

### Etapa 2.B: Testando a Integração da API (O fluxo real na porta 3000)
1. Clique no arquivo **`apiIntegration.cy.js`**.
2. Nesta etapa são 5 testes emulando o Postman.
   - **Explique o Teste 1 e 2:** *"A automação realiza um POST no endpoint `/produtos` criando a 'Cadeira Gamer', confere se a API manda um Status 201 e na sequência um GET varrendo para confirmar que Array alimentou a lista."*
   - **Explique o Teste 3, 4 e 5:** *"Usa o ID que acabamos de criar para testar individualmente Buscar (GET/:id), Atualizar os Preços (PUT) conferindo o body modificado e, por fim deleta de verdade provando que a exclusão joga Erro 404 depois."*

### Etapa 2.C: Testando a UI End-to-End (O Cypress assumindo o mouse)
1. Volte e clique no arquivo **`frontendUI.cy.js`**.
2. Essa parte arranca sorriso do professor! São 5 testes onde o Cypress vai abrir a página da sua API e interagir como um usuário.
   - **Explique o Teste 1:** *"Verifica se a página carregou a tabela, e as Divs básicas sem bugs estruturais"*
   - **Explique o Teste 2 e 3:** *"O Cypress digita no teclado, aperta o Salvar e usa `cy.get()` no HTML pra provar que o texto renderizou na tela. Na sequência ele clica no nosso botão "Del" e atesta que o Componente sumiu da View."*
   - **Explique o Teste 4 e 5:** *"A mágica visual! Ele preenche os campos com `-500` no preço e depois `-5` no estoque de propósito. Veja ali na tela que nos dois casos ele interceptou com extrema velocidade a nossa DIV Vermelha que criamos, confirmando que a interface se comunica e bloqueia o usuário amigavelmente."*

---

## 🚫 3. A Quebra (Validando a Importância do Cypress)

Agora você vai provar por que a disciplina é importante! Vamos quebrar uma regra de negócio de propósito para o Cypress pegar na veia.

1. **Abra o arquivo:** `src/services/productService.js`.
2. Tire o comentáro ocultando a Validação que checa e barram de `preço < 0` (Linha 18). Vai ficar assim:
```js
  // if (data.preco === undefined || parseFloat(data.preco) < 0) {
  //   throw new Error('Preço não pode ser negativo');
  // }
```
3. Salve o arquivo e diga *"Senhores, imaginemos que um júnior fez um Commit acidental removendo a proteção da empresa"*.
4. Mande o Cypress rodar de novo em `productService.cy.js`. 
5. **A TELA FICARÁ VERMELHA.** O Cypress vai gritar o erro: `AssertionError`.
6. Diga enfaticamente: *"Graças à automação que configuramos hoje, esse código defeituoso foi barrado aqui, localmente, na camada Unitária, e impediu que um erro primário de perda de capital com preços negativos fosse pra Produção."*
7. Desfaça a modificação (Ctrl+Z), salve e rode o Cypress provando tudo voltar a nascer *Verde*.

---

## 🌐 4. [Opcional] Apresentando o Produto Final na Mão

Se sobrar tempo e o professor quiser ver "O Sistema em si" e não só os testes:
1. Abra um navegador normal (Chrome/Edge).
2. Vá em `http://localhost:3000`.
3. Preencha na mão um produto ("Cadeira Gamer", 800 reais), aperte em "Salvar".
4. Destaque a caixa verde de sucesso e o botão "Edit" que programamos para dar uma visão limpa de tudo que está acontecendo fisicamente nos bastidores dos testes que o Cypress estava rodando de forma hiperveloz.