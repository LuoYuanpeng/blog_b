const router = require('koa-router')()
const Controller = require('./controller/index')

module.exports = (app) => {
	router.get('/', Controller.index)

	router.post('/register', Controller.register)

	router.post('/login', Controller.login)

	app.use(router.routes())
		.use(router.allowedMethods())
}
