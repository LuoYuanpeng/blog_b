const Koa = require('koa')
const app = new Koa()
const router = require("./router")
const middleware = require("./middleware")

middleware(app)
router(app)

app.listen(3333, () => {
	console.log('server has started at http://127.0.0.1:3333')
})
