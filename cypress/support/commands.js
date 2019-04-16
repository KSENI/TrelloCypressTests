// ***********************************************
// This example commands.js shows you how to
// create letious custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add("typeUserNameAndPassword", (user, password) => {
	cy.get('#user').type(user);
	cy.get('#password').type(password);
	cy.get('#login').click();
})

Cypress.Commands.add("authorization", ()  => {
	Cypress.Cookies.preserveOnce('dsc')
	let xhr = new XMLHttpRequest()
	let body = 'method=password&factors%5Buser%5D=yoki%40digital-email.com&factors%5Bpassword%5D=1й1й1й1Й'
	let cookie
	
	xhr.open('POST', 'https://trello.com/1/authentication', false)
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
	xhr.send(body)
	
	let autorizationCode = JSON.parse(xhr.responseText)["code"]

	cy.visit('https://trello.com/login')
	cy.getCookie('dsc').should('exist').then((c) => {cookie = c })
	let dsc = 'authentication=' + autorizationCode + '&dsc='

	cy.get('#password').then(() => {
	cy.request({
		url: 'https://trello.com/1/authorization/session',
		method: 'POST',
		body: dsc + cookie.value,
		form: true
		})
	})
})

Cypress.Commands.add("createCardIfEmpty", () => {
	let apiKey = '51b740fb488020d94917ef34f32d43e9'
	let apiToken = '75990160bd05c4a2a23578845434a62463e00fe16ba14c7cbb1a6d747437916a'
	let idList = '5cb4e5e2ecac4d1c5dc73fb8'
	let xhr = new XMLHttpRequest()

	// получение id доски
	xhr.open('GET', 'https://api.trello.com/1/members/me/boards?key='+ apiKey + '&token=' + apiToken, false)
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
	xhr.send()
	let bordId = JSON.parse(xhr.responseText)[0]['id']

	// получить количество карточек
	xhr.open('GET', 'https://api.trello.com/1/boards/'+ bordId +'/?cards=all&key=' + apiKey + '&token=' + apiToken, false)
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
	xhr.send()
	let cards = JSON.parse(xhr.responseText)['cards']
	let countCards = cards.length
	
	if (countCards < 2) //если нет карточек, создай
		{
			let data = null
			xhr.open('POST', 'https://api.trello.com/1/cards?name=newCard&idList=' + idList +
			'&keepFromSource=all&key=' + apiKey + '&token=' + apiToken, false)
			xhr.send(data)

			xhr.open('POST', 'https://api.trello.com/1/cards?name=newCard2&idList=' + idList +
			'&keepFromSource=all&key=' + apiKey + '&token=' + apiToken, false)
			xhr.send(data)
		}
})

Cypress.Commands.add("registration", (name, email, password) => {
	cy.get('#name').type(name)
	cy.get('#email').type(email)
	cy.get('#password').type(password)
	cy.get('#signup').click()
})


Cypress.Commands.add("logout", () => {
	let cookie	  
	cy.getCookie('dsc').should('exist').then((c) => {cookie = c })
	cy.visit('/b/wYCY2XGN/new-desk')
	
	cy.get('#board').then(() => {
	cy.request( 'POST', 'https://trello.com/logout', {'dsc': cookie.value})
	})
	cy.visit('/logged-out')	
})