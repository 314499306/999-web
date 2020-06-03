import JCookie from 'js-cookie'

function getToken() {
	return JCookie.get('token')
}

function setToken(token) {
	JCookie.set('token', token)
}

function removeToken() {
	JCookie.remove('token')
}

export default { getToken, setToken, removeToken }
