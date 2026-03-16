const productService = require('../services/productService');

exports.listarProdutos = (req, res) => {
  try {
    const produtos = productService.listarProdutos();
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}

exports.buscarProduto = (req, res) => {
  try {
    const produto = productService.buscarProduto(req.params.id);
    res.status(200).json(produto);
  } catch (error) {
    if (error.message === 'Produto não encontrado') {
      res.status(404).json({ erro: error.message });
    } else {
      res.status(500).json({ erro: error.message });
    }
  }
}

exports.criarProduto = (req, res) => {
  try {
    const novoProduto = productService.criarProduto(req.body);
    res.status(201).json(novoProduto);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
}

exports.atualizarProduto = (req, res) => {
  try {
    const atualizado = productService.atualizarProduto(req.params.id, req.body);
    res.status(200).json(atualizado);
  } catch (error) {
    if (error.message === 'Produto não encontrado') {
      res.status(404).json({ erro: error.message });
    } else {
      res.status(400).json({ erro: error.message });
    }
  }
}

exports.deletarProduto = (req, res) => {
  try {
    productService.deletarProduto(req.params.id);
    res.status(204).send(); // 204 No Content
  } catch (error) {
    if (error.message === 'Produto não encontrado') {
      res.status(404).json({ erro: error.message });
    } else {
      res.status(500).json({ erro: error.message });
    }
  }
}