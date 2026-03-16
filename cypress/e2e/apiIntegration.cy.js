describe('Testes de Integração - API de Produtos', () => {
  let createdProductId;

  it('1. Deve criar um produto (POST /produtos)', () => {
    cy.request('POST', '/produtos', {
      nome: 'Cadeira Gamer Integradora',
      preco: 1200,
      estoque: 5
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('id');
      expect(response.body.nome).to.eq('Cadeira Gamer Integradora');
      createdProductId = response.body.id;
    });
  });

  it('2. Deve listar os produtos (GET /produtos)', () => {
    cy.request('GET', '/produtos').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      // [ Assert Arrays ]
      expect(response.body.length).to.be.greaterThan(0);
    });
  });

  it('3. Deve buscar um produto específico (GET /produtos/:id)', () => {
    cy.request('GET', `/produtos/${createdProductId}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.id).to.eq(createdProductId);
      expect(response.body.nome).to.eq('Cadeira Gamer Integradora');
    });
  });

  it('4. Deve atualizar o produto (PUT /produtos/:id)', () => {
    cy.request('PUT', `/produtos/${createdProductId}`, {
      preco: 1100,
      estoque: 4
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.preco).to.eq(1100);
      expect(response.body.estoque).to.eq(4);
    });
  });

  it('5. Deve deletar o produto e não estar mais disponível (DELETE e GET /produtos/:id)', () => {
    cy.request('DELETE', `/produtos/${createdProductId}`).then((response) => {
      // [ Assert Null/No Content ]
      expect(response.status).to.eq(204);
    });

    // [ Validate Deletion ]
    cy.request({
      method: 'GET',
      url: `/produtos/${createdProductId}`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
});
