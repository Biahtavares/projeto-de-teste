exports.listarProdutos = (req, res) => {
  res.json({ mensagem: "Listar produtos" })
}

exports.buscarProduto = (req, res) => {
  res.json({ mensagem: "Buscar produto" })
}

exports.criarProduto = (req, res) => {
  res.json({ mensagem: "Criar produto" })
}

exports.atualizarProduto = (req, res) => {
  res.json({ mensagem: "Atualizar produto" })
}

exports.deletarProduto = (req, res) => {
  res.json({ mensagem: "Deletar produto" })
}