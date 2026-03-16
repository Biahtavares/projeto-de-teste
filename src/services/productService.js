const repository = require('../repository/productRepository');

exports.listarProdutos = () => {
  return repository.findAll();
}

exports.buscarProduto = (id) => {
  const produto = repository.findById(id);
  if (!produto) {
    throw new Error('Produto não encontrado');
  }
  return produto;
}

exports.criarProduto = (data) => {
  if (!data.nome || data.nome.trim() === '') {
    throw new Error('Nome do produto é obrigatório');
  }
  if (data.preco === undefined || parseFloat(data.preco) < 0) {
    throw new Error('Preço não pode ser negativo');
  }
  if (data.estoque === undefined || parseInt(data.estoque) < 0) {
    throw new Error('Estoque não pode ser negativo');
  }
  
  return repository.create(data);
}

exports.atualizarProduto = (id, data) => {
  if (data.nome !== undefined && data.nome.trim() === '') {
    throw new Error('Nome do produto não pode ser vazio');
  }
  if (data.preco !== undefined && parseFloat(data.preco) < 0) {
    throw new Error('Preço não pode ser negativo');
  }
  if (data.estoque !== undefined && parseInt(data.estoque) < 0) {
    throw new Error('Estoque não pode ser negativo');
  }
  
  const updatedProduto = repository.update(id, data);
  if (!updatedProduto) {
    throw new Error('Produto não encontrado');
  }
  
  return updatedProduto;
}

exports.deletarProduto = (id) => {
  const deletedProduto = repository.delete(id);
  if (!deletedProduto) {
    throw new Error('Produto não encontrado');
  }
  return deletedProduto;
}
