function email(email) {
	const emailPattern = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/

	return emailPattern.test(email)
}

function password(password) {
	const passPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{9,}$/

	return passPattern.test(password)
}

function url(url) {
	const urlPattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/

	return urlPattern.test(url)
}

export default { email, password, url }
