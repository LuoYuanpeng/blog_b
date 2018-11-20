const UserService = require('../service/index')

module.exports = {
	index: async (ctx, next) => {
		ctx.response.body = '<h1>This is HomePage!</h1>'
	},
	
	register: async (ctx, next) => {
		let { name, pwd } = ctx.request.body
		let res = await UserService.register(name, pwd)
		ctx.response.body = res 
	},

	login: async (ctx, next) => {
		let { name, pwd } = ctx.request.body
		let res = await UserService.login(name, pwd)
		ctx.response.body = "<h1>Login Successful!</h1>"
	}
}
