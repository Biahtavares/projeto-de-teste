describe('Testes E2E: Interface Gráfica (Frontend UI)', () => {
    
    // [ Hook: Setup URL ]
    beforeEach(() => {
        cy.visit('/');
    });

    it('1. Deve renderizar a Tela Inicial com Form e Tabela', () => {
        // [ Assert DOM Structure ]
        cy.get('h1').contains('Gestor de Produtos');
        cy.get('form#productForm').should('be.visible');
        cy.get('table').should('exist');
    });

    it('2. Deve Criar um Novo Produto pela UI e Listá-lo na Tabela', () => {
        cy.wait(1000); 
        // [ Fill Input ]
        cy.get('input#nome').type('Headset Bluetooth Demo', { delay: 60 });
        cy.get('input#preco').type('299.90', { delay: 60 });
        cy.get('input#estoque').type('15', { delay: 60 });

        cy.wait(1000); 
        // [ Click Submit ]
        cy.get('button#btnSalvar').click();

        // [ Wait Network/Render ]
        cy.wait(2000);

        // [ Assert HTML View Insertion ]
        cy.get('table tbody tr').last().find('.prod-nome').should('contain', 'Headset Bluetooth Demo');
        cy.get('table tbody tr').last().find('.prod-preco').should('contain', '299.90');
    });

    it('3. Deve Deletar o produto criado utilizando o clique no botão Del', () => {
        cy.wait(1000); 
        // [ Traverse DOM & Delete ]
        cy.get('table tbody tr').contains('Headset Bluetooth Demo') 
          .parent() 
          .find('.btn-danger') 
          .click(); 

        cy.wait(1500); 

        // [ Assert Element Removed ]
        cy.get('table tbody tr').should('not.contain', 'Headset Bluetooth Demo');
    });

    it('4. UI - Deve validar e estourar Erro visual se inserir Preço Negativo', () => {
        cy.wait(1000);
        // [ Fill Input ]
        cy.get('input#nome').type('Cadeira Quebrada', { delay: 50 });
        cy.get('input#preco').type('-500', { delay: 100 }); 
        cy.get('input#estoque').type('10', { delay: 50 });

        cy.wait(1000); 
        // [ Submit ]
        cy.get('button#btnSalvar').click();

        // [ Assert 400 Error Handling ]
        cy.get('div#errorMessage')
          .should('be.visible')
          .and('contain', 'Erro: Preço não pode ser negativo');
    });

    it('5. UI - Deve validar e estourar Erro visual se inserir Estoque Negativo', () => {
        cy.wait(2000); 
        
        // [ Fill Input ]
        cy.get('input#nome').type('Teclado Quebrado', { delay: 50 });
        cy.get('input#preco').type('100', { delay: 50 });
        cy.get('input#estoque').type('-5', { delay: 100 }); 

        cy.wait(1000);
        // [ Submit ]
        cy.get('button#btnSalvar').click();

        // [ Assert Layout Red Box Error ]
        cy.get('div#errorMessage')
          .should('be.visible')
          .and('contain', 'Erro: Estoque não pode ser negativo');
    });

});
