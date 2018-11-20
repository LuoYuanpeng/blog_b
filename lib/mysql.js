const mysql = require('mysql')
const config = require('./default.js')


let pool = mysql.createPool({
	host        : config.database.HOST,
	user        : config.database.USERNAME,
	password    : config.database.PASSWORD,
	database    : config.database.DATABASE
})

let query = function(sql, values) {
	return new Promise((resolve, reject) => {
		pool.getConnection(function(err,connection) {
			if (err) {
				reject(err)
			} else {
				connection.query(sql, values, (err, rows) => {
					if (err) {
						reject(err)
					} else {
						resolve(rows)
					}
					connection.release()
				})
			}
		})
	})
}

let users = `
	create table if not exists users(
		id int not null auto_increment,
		name varchar(100) not null,
		pwd varchar(100) not null,
		primary key (id)
	);
`

let createTable = function(sql) {
	return query(sql, [])
}

createTable(users)

let regUser = (value) => {
	let _sql = `insert into users set name=?,pwd=?;`
	return query(_sql, value)
}

let findUser = (name) => {
	let _sql = `select * from users where name="${name}";`
	return query(_sql)
}

module.exports = {
	query,
	regUser,
	findUser,
}
