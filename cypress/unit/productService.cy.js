const productService = require('../../src/services/productService');

describe('Testes Unitários - Regras de Negócio (Product Service)', () => {

  it('1. Deve validar produto sem nome', () => {
    expect(() => productService.criarProduto({ preco: 10, estoque: 5 })).to.throw('Nome do produto é obrigatório');
  });

  it('2. Deve validar produto com preço negativo', () => {
    expect(() => productService.criarProduto({ nome: 'Teste', preco: -5, estoque: 5 })).to.throw('Preço não pode ser negativo');
  });

  it('3. Deve validar produto com estoque negativo', () => {
    expect(() => productService.criarProduto({ nome: 'Teste', preco: 10, estoque: -1 })).to.throw('Estoque não pode ser negativo');
  });

  it('4. Deve criar um produto com dados válidos', () => {
    const produto = productService.criarProduto({ nome: 'Teclado Mecânico', preco: 150, estoque: 20 });
    expect(produto).to.have.property('id');
    expect(produto.nome).to.equal('Teclado Mecânico');
    expect(produto.preco).to.equal(150);
  });

  it('5. Deve validar atualização com preço negativo', () => {
    // [ Setup ]
    const produto = productService.criarProduto({ nome: 'Monitor HQ', preco: 500, estoque: 10 });
    // [ Act / Assert ]
    expect(() => productService.atualizarProduto(produto.id, { preco: -10 })).to.throw('Preço não pode ser negativo');
  });

  it('6. Deve validar atualização de produto que não existe', () => {
    expect(() => productService.atualizarProduto(9999, { preco: 50 })).to.throw('Produto não encontrado');
  });

  it('7. Deve atualizar um produto com sucesso', () => {
    const produto = productService.criarProduto({ nome: 'Mousepad Gamer', preco: 20, estoque: 50 });
    const atualizado = productService.atualizarProduto(produto.id, { preco: 25, estoque: 45 });
    
    expect(atualizado.preco).to.equal(25);
    expect(atualizado.estoque).to.equal(45);
  });

  it('8. Deve listar produtos corretamente', () => {
    const produtos = productService.listarProdutos();
    expect(produtos).to.be.an('array');
    expect(produtos.length).to.be.greaterThan(0);
  });
});
