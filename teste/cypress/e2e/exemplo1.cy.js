describe('Criando cenário de teste para o site globalsqa', () => {

  it('Caso de teste: Registrando um usuário no site com sucesso', () => {

    criarUsuario()

  })

  it('Caso de teste: Registrando um usuário com falha (faltando senha)', () => {

    cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/register')
    cy.get('#firstName').type('Tiago')
    cy.get('#Text1').type('Giugni')
    cy.get('#username').type('tiagogiugni')
    cy.get('#password').type('abc123')
    cy.get('#password').clear()
    cy.get('.has-error > .help-block').should('have.text', 'Password is required')
    cy.get('.btn-primary').should('be.disabled')

  })

  it('Caso de teste: Realizando login com sucesso', () => {

    let info = criarUsuario()
    cy.get('#username').type(info[0])
    cy.get('#password').type(info[1])
    cy.get('.btn-primary').click()
    cy.get('h1.ng-binding').should('contain.text', info[0])

  })

  it('Caso de teste: Registrando um usuário com falha (faltando primeiro nome)', () => {

    criarUsuarioSemNome()

  })

  it('Caso de teste: Realizar logout com sucesso', () => {

    realizarLogout()

  })

})

function criarUsuario() {

  let horas = new Date().getHours().toString();
  let minutos = new Date().getMinutes().toString();
  let seg = new Date().getSeconds().toString()
  let user = horas + minutos + seg + 'Id'
  let senha = horas + minutos + seg + 'Senha'
  let userInfo = [user, senha]

  cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
  cy.get('.btn-link').click()
  cy.get('#firstName').type(user)
  cy.get('#Text1').type(user)
  cy.get('#username').type(user)
  cy.get('#password').type(senha)
  cy.get('.btn-primary').click()
  cy.get('.ng-binding').should('contain.text', 'Registration successful')

  return userInfo

}

function realizarLogout() {

  let info = criarUsuario()
    cy.get('#username').type(info[0])
    cy.get('#password').type(info[1])
    cy.get('.btn-primary').click()
    cy.get('h1.ng-binding').should('contain.text', info[0])

    cy.get('.btn').click()
    cy.get('h2').should('contain.text', 'Login')

}

function criarUsuarioSemNome() {

  let hours = new Date().getHours().toString()
  let minutes = new Date().getMinutes().toString()
  let seconds = new Date().getSeconds().toString()

  let user = hours + minutes + seconds + 'id'

  let password = hours + minutes + seconds + 'password'

  let userInfo = [user, password]

  cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/register')
  cy.get('#firstName').type(user)
  cy.get('#Text1').type(user)
  cy.get('#username').type(user)
  cy.get('#password').type(password)
  cy.get('#firstName').clear()
  cy.get('.has-error > .help-block').should('have.text', 'First name is required')
  cy.get('.btn-primary').should('be.disabled')

  return userInfo

}
