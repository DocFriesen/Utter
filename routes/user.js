//here be my user related routes
const express = require('express')
const mysql = require('mysql')
const router = express.Router()

router.get('/messages', (req, res) => {
	console.log("Your messages, posthaste.")
	res.end()
})

module.exports = router

const pool = mysql.createPool({
	connectionLimit: 10,
	host: 'localhost',
	user: 'root',
	password: 'freezen93',
	database: 'lbta_mysql'
})

function getConnection() {
	return pool
}

router.get("/users", (req, res) => {
	const connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'freezen93',
		database: 'lbta_mysql'
	})
	const queryString = "SELECT * FROM users"
	connection.query(queryString, (err, rows, fields) => {
		if (err) {
			console.log("Failed to query for users: " + err)
			res.sendStatus(500)
			return
		}
	res.json(rows)
	})
})

router.get('/user/:id', (req, res) => {
	console.log("Pulling up user with id: " + req.params.id)

	const connection = getConnection()

	const userId = req.params.id
	const queryString = "SELECT * FROM users WHERE id = ?"
	connection.query(queryString, [userId], (err, rows, fields) => {
		if (err) {
			console.log("Failed to query for users: " + err)
			res.sendstatus(500)
			return
		}

		console.log("Here are your users, sire.")

		var users = rows.map((row) => {
			return {firstName: row.first_name, lastName: row.last_name}
		})

		res.json(users)
	})
})

router.post('/user_create', (req, res) => {
	console.log("Creating a new user...")

	console.log("First name: " + req.body.create_first_name)
	const firstName = req.body.create_first_name
	const lastName = req.body.create_last_name
	
	const queryString = "INSERT INTO users (first_name, last_name) VALUES (?, ?)"
	getConnection().query(queryString, [firstName, lastName], (err, results, fields) => {
		if (err) {
			console.log("Failed to insert new user: " + err)
			res.sendStatus(500)
			return
		}
		console.log("Inserted a new user with id: ", results.insertId)
		res.end()
	})

	res.end()
})