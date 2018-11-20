const userModal = require('../lib/mysql.js')
const crypto = require('crypto')

module.exports = {
	login: async (name, pwd) => {
		let data
		if (name === 'luo' && pwd === '123123') {
			data = {
				status: 0,
				msg: 'Login!'
			}
		}
		if (name !== 'luo') {
			data = {
				status: 1,
				msg: 'no User'
			}
		}
		if (pwd !== '123123') {
			data = {
				status: 1,
				msg: 'err pwd'
			}
		}
		return data
	},
	
	register: async (name, pwd) => {
		let data
		if (!name || !pwd) {
			data={
				status:1,
				msg:'No complete msg',
			}
		}
		await userModal.findUser(name)
			.then(async (res) => {
				if (res.length > 0) {
					data = {
						status: 1,
						msg: 'had account',
					}
					return data
				}
				let hash = crypto.createHash('sha256')
				let password = hash.update(pwd)
				await userModal.regUser([name, hash.digest('hex')])
					.then(res => {
						data = {
							status: 0,
							msg: 'reg success',	
						}
					})
			})
		return data
	}
}

