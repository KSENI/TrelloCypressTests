let randomNumber = Math.random()
let randomEmail = randomNumber + '@gmail.com'
let presentEmail = 'yoki@digital-email.com'
let smallPassword = '1234567'

describe('RegistrationTests', () => {
	it('TestThatUnknownUserCanRegister', () => {
		cy.visit('/ru/signup')
		cy.registration(randomNumber, randomEmail, randomNumber)
		
		// первая страница обучения "Добро пожаловать в Trello!"
		cy.get('.first-board-image').should('be.visible')
		cy.get('h2 > span').should('have.text', 'Добро пожаловать в Trello!')

		cy.get('[data-test-id="board-name-input"]').type('Планирование отпуска')
		cy.get('[data-test-id="board-name-display"]').should('have.text', 'Планирование отпуска')

		cy.get('[data-test-id="continue-button"]').click()
		
		//вторая страница обучения "Упорядочивайте информацию с помощью колонок"
		cy.get('h2 > span').should('have.text', 'Упорядочивайте информацию с помощью колонок')
		cy.get('.first-board-image-list-container:last').should('have.text', 'Список делВ процессеГотово')
		cy.get('[data-test-id="list-name-input"]').type('Не готово')
		cy.get('[data-test-id="list-name-display"]').should('have.text', 'Не готово')

		cy.get('[data-test-id="continue-button"]').click()
		
		//третья страница обучения "Записывайте, а не запоминайте"
		cy.get('[data-test-id="card-name-input"]').type('Пункт')
		cy.get('[data-test-id="card-name-display"]').should('have.text', 'Пункт')

		cy.get('[data-test-id="continue-button"]').click()
		
		//четвертая страница обучения "Добавьте детали"
		cy.get('[data-test-id="checklist-field"]').type('Список интересных задач')
		cy.get('[data-test-id="checklist-display"]').should('have.text', 'Список интересных задач')

		cy.get('[data-test-id="continue-button"]').click()
		
		//последняя страница обучения
		cy.contains('Вы познакомились с досками, колонками и карточками. Теперь настройте Trello так, как удобно именно вам!').should('be.visible')
		cy.contains('Все готово!').should('be.visible')
		cy.contains('В движении жизнь! Перемещайте карточки вверх, вниз или из колонки в колонку, чтобы работа шла быстрее.').should('be.visible')
		cy.get('.first-board-image-base').should('be.visible').should('be.visible')
		cy.contains('Теперь вы знаете всё, что нужно, и можете работать самостоятельно.').click()

		//проверка что зареганный П отображается
		cy.contains('Не готово').should('be')
		cy.contains('Пункт').should('be')
	}) 

	it('TestThatKnownUserCanNotRegister', () => {
		cy.visit('/ru/signup')
		cy.registration(randomNumber, presentEmail, randomNumber)
		cy.contains('Почта уже используется другим аккаунтом.').should('be.visible')
		cy.get('#email').should('have.class', 'error')
	})  

	it('TestThatSmallPasswordCanNotRegister', () => {
		cy.visit('/ru/signup')
		cy.registration(randomNumber, randomEmail, smallPassword)
		cy.contains('Пароль должен быть минимум из 8 символов.').should('be.visible')
		cy.get('#password').should('have.class', 'error')
	})
})
