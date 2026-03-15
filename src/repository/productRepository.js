let products = [
  { id: 1, nome: "Mouse", preco: 50, estoque: 10 }
];

exports.findAll = () => {
  return products;
}

exports.findById = (id) => {
  return products.find(p => p.id === parseInt(id));
}

exports.create = (productData) => {
  const newProduct = {
    id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
    nome: productData.nome,
    preco: parseFloat(productData.preco),
    estoque: parseInt(productData.estoque)
  };
  products.push(newProduct);
  return newProduct;
}

exports.update = (id, productData) => {
  const index = products.findIndex(p => p.id === parseInt(id));
  if (index !== -1) {
    const updatedProduct = {
      ...products[index],
      ...productData,
      id: parseInt(id)
    };
    
    if (updatedProduct.preco !== undefined) updatedProduct.preco = parseFloat(updatedProduct.preco);
    if (updatedProduct.estoque !== undefined) updatedProduct.estoque = parseInt(updatedProduct.estoque);

    products[index] = updatedProduct;
    return updatedProduct;
  }
  return null;
}

exports.delete = (id) => {
  const index = products.findIndex(p => p.id === parseInt(id));
  if (index !== -1) {
    const deletedProduct = products[index];
    products.splice(index, 1);
    return deletedProduct;
  }
  return null;
}
