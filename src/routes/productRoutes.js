const express = require('express')
const router = express.Router()

const productController = require('../controllers/productController')

router.get('/', productController.listarProdutos)

router.get('/:id', productController.buscarProduto)

router.post('/', productController.criarProduto)

router.put('/:id', productController.atualizarProduto)

router.delete('/:id', productController.deletarProduto)

module.exports = router