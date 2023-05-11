describe('Criando cenário de teste para o site Amazon', () => {

  it('Caso de teste: Tentativa de cadastro com uma senha que não atende aos requisitos (falha)', () => {

    cy.visit('https://www.amazon.com.br/')
    cy.get('#nav-link-accountList').click()
    cy.get('#createAccountSubmit').click()
    cy.get('#ap_customer_name').type('Tiago')
    cy.get('#ap_email').type('testeS206@teste.com')
    cy.get('#ap_password').type('12345')
    cy.get('#ap_password_check').type('12345')
    cy.get('#continue').click()
    cy.get('#auth-password-invalid-password-alert > .a-box-inner').should('contain.text', 'Mínimo de 6 caracteres necessários')

  })

  it('Caso de teste: Verificar se a página pede login ao tentar acessar pedidos e devoluções', () => {

    cy.visit('https://www.amazon.com.br')
    cy.get('#nav-orders').click()
    cy.get('.a-padding-extra-large > .a-spacing-small').should('contain.text', 'Fazer login')

    //cy.get('._p13n-zg-banner-landing-page-header_style_zgLandingPageBannerTitleContainer__3pQqv').should('contain.text', 'Nossos vencedores no ranking de vendas nas últimas 24 horas. Atualizado com frequência.')

  })

  it('Caso de teste: Realizando uma pesquisa na barra de tarefas e apertando enter', () => {

    cy.visit('https://www.amazon.com.br/')
    cy.get('#twotabsearchtextbox').type('Ração prime{enter}')
    cy.get('.a-color-state').should('contain.text', '"Ração prime"')

  })

  it('Caso de teste: Login com e-mail não existente (falha)', () => {

    cy.visit('https://www.amazon.com.br/')
    cy.get('#nav-link-accountList').click()
    cy.get('#ap_email').type('testeS206@teste.com')
    cy.get('.a-button-inner > #continue').click()
    cy.get('#auth-error-message-box > .a-box-inner').should('contain.text', 'Houve um problema')
    cy.get('#auth-error-message-box > .a-box-inner').should('contain.text', 'Não encontramos uma conta associada a este endereço de e-mail')


  })

  it('Caso de teste: Adicionando um produto no carrinho com sucesso sem estar logado', () => {

    cy.visit('https://www.amazon.com.br/')
    cy.get('#twotabsearchtextbox').type('Cama para cachorros{enter}')
    cy.get('[data-index="3"] > .sg-col-inner > .s-widget-container > [data-component-type="s-impression-logger"] > .s-featured-result-item > .s-card-container > .a-spacing-base > .puis-padding-left-small > .s-title-instructions-style > .a-size-mini > .a-link-normal > .a-size-base-plus').click()
    cy.get('#add-to-cart-button').click()
    cy.get('.a-padding-medium').should('contain.text', 'Adicionado ao carrinho')

  })


  it('Caso de teste: Verificar se o botão de logo da Amazon está retornando para a URL certa, estando em outra página', () => {

    cy.visit('https://www.amazon.com.br/deals?ref_=nav_cs_gb')
    cy.get('#nav-logo-sprites').click()
    cy.url().should('eq', 'https://www.amazon.com.br/ref=nav_logo')

  })

})

