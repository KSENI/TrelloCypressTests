let bordAdress = '/b/wYCY2XGN/new-desk'

describe('CardsActionTests', () => {
	it('TestThatUserCanCreateTitleCard', () => {
		cy.authorization()
		cy.visit(bordAdress)

		cy.get('.js-open-card-composer').first().click()
		cy.get('.list-card-composer-textarea').type('Нормальный заголовок карточки')
		cy.get('.js-add-card').click()

		cy.get('.list-card-title').last().should('have.text', 'Нормальный заголовок карточки') 
	})
  
	it('TestThatUserCanCreateTextCard', () => {
		cy.authorization()
		cy.visit(bordAdress)

		cy.get('.list-card-title').last().click()
		cy.get('.js-description-draft').type('Нормальное описание карточки')
		cy.get('.mod-submit-edit').click()

		cy.get('.js-show-with-desc > p').should('have.text', 'Нормальное описание карточки')

		cy.get('.dialog-close-button').click()

		cy.get('.icon-description').should('be.visible') 
	})   
  
	it('TestThatUserCanDeleteCard', () => {
		cy.authorization()
		cy.createCardIfEmpty()
		cy.visit(bordAdress)
		let startCountCards 
		let endCountCards 

		cy.get('.js-card-details').its('length').then((c) => {startCountCards = c})
		cy.get('.list-card-title').last().click()
		cy.get('.js-archive-card').click()
		cy.get('.js-delete-card').click()
		cy.get('.js-confirm').click()

		cy.get('.js-card-details').its('length').then((c) => {endCountCards = c})

		cy.get('#board').then(() => {
		expect(startCountCards - 1).to.equal(endCountCards)
		})
	})
})
