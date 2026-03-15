const API_URL = 'http://localhost:3000/produtos';

const form = document.getElementById('productForm');
const tableBody = document.getElementById('tableBody');
const emptyMessage = document.getElementById('emptyMessage');

let editingId = null;

// [ Fetch GET ]
async function loadProducts() {
  try {
    const response = await fetch(API_URL);
    const produtos = await response.json();
    renderTable(produtos);
  } catch (err) {
    console.error("Erro ao carregar produtos", err);
  }
}

// [ Render ]
function renderTable(produtos) {
  tableBody.innerHTML = '';
  
  if (produtos.length === 0) {
    emptyMessage.style.display = 'block';
    document.getElementById('productsTable').style.display = 'none';
    return;
  }
  
  emptyMessage.style.display = 'none';
  document.getElementById('productsTable').style.display = 'table';

  produtos.forEach(prod => {
    const row = document.createElement('tr');
    row.id = `produto-row-${prod.id}`; 
    
    row.innerHTML = `
      <td>${prod.id}</td>
      <td class="prod-nome">${prod.nome}</td>
      <td class="prod-preco">${Number(prod.preco).toFixed(2)}</td>
      <td class="prod-estoque">${prod.estoque} un</td>
      <td>
        <button class="btn-edit" id="editar-${prod.id}" onclick="editProduct(${prod.id}, '${prod.nome}', ${prod.preco}, ${prod.estoque})">Edit</button>
        <button class="btn-danger" id="deletar-${prod.id}" onclick="deleteProduct(${prod.id})">Del</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// [ Populate Form ]
function editProduct(id, nome, preco, estoque) {
  editingId = id;
  document.getElementById('nome').value = nome;
  document.getElementById('preco').value = preco;
  document.getElementById('estoque').value = estoque;
  
  const btn = document.getElementById('btnSalvar');
  btn.innerText = 'Atualizar Produto';
  btn.style.backgroundColor = '#2196F3';
}

// [ Submit: POST/PUT ]
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const errorDiv = document.getElementById('errorMessage');
  const successDiv = document.getElementById('successMessage');
  errorDiv.style.display = 'none';
  successDiv.style.display = 'none';

  const productData = {
    nome: document.getElementById('nome').value,
    preco: document.getElementById('preco').value,
    estoque: document.getElementById('estoque').value
  };

  try {
    const url = editingId ? `${API_URL}/${editingId}` : API_URL;
    const method = editingId ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });

    if (res.ok) {
      form.reset();
      editingId = null;
      document.getElementById('btnSalvar').innerText = 'Salvar Produto';
      document.getElementById('btnSalvar').style.backgroundColor = '#4CAF50';
      
      successDiv.innerText = method === 'POST' ? 'Produto Criado com Sucesso!' : 'Produto Atualizado correntamente!';
      successDiv.style.display = 'block';
      setTimeout(() => successDiv.style.display = 'none', 3000);
      
      loadProducts();
    } else {
      const errorData = await res.json();
      errorDiv.innerText = `Erro: ${errorData.erro}`;
      errorDiv.style.display = 'block';
    }
  } catch(err) {
    console.error('Erro de requisição:', err);
    errorDiv.innerText = `Erro Crítico de Conexão`;
    errorDiv.style.display = 'block';
  }
});

// [ Delete ]
async function deleteProduct(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    if (res.ok) {
      loadProducts();
    }
  } catch (err) {
    console.error("Erro ao deletar:", err);
  }
}

// [ Init ]
loadProducts();
