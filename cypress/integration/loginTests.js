let user = 'yoki@digital-email.com'
let password = '1й1й1й1Й'
let notValidUserName = 'dfssdfsdfsdfsdf'
let notValidPassword = '1111'
let expectedTextWhenPasswordNotValidRus = 'Неверный пароль'
let expectedTextWhenLoginNotValidRus = 'Аккаунта с таким именем пользователя не существует'

describe('LoginTests', () => {
	it('TestThatUserWhithValidNameAndPasswordCanLogin', () => {
		cy.visit('/ru/login')
		cy.typeUserNameAndPassword(user,password);
		
		cy.get('.mod-add').should('be.visible');
	}) 

	it('TestThatUserWhithNotValidNameCanNotLogin', () => {
		cy.visit('/ru/login')
		cy.typeUserNameAndPassword(notValidUserName, password)

		cy.get('#error > .error-message').should('have.text', expectedTextWhenLoginNotValidRus)
		cy.get('#user').should('have.class', 'error')
	}) 

	it('TestThatUserWhithNotValidPasswordCanNotLogin', () => {
		cy.visit('/ru/login')
		cy.typeUserNameAndPassword(user,notValidPassword)

		cy.get('#error > .error-message').should('have.text', expectedTextWhenPasswordNotValidRus)
		cy.get('#password').should('have.class', 'error')
	})
}) 

describe('ExitTests', () => {
	it('TestThatLoginUserCanExit', () => {
		cy.authorization() 
		cy.logout()

		cy.contains('Войти').should('be.visible')
		cy.contains('Зарегистрироваться').should('be.visible')
		cy.contains('Вы вышли. Ну, что теперь?').should('be.visible')
	}) 
})
  

	

