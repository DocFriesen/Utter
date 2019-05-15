// loading the server...
//@flow
const express = require("express");
const app = express();
const morgan = require('morgan');
const mysql = require('mysql');

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static('./public'))
app.use(morgan('short'))


app.get('/', function (req, res) {
	console.log('Responding to root route')
  	res.send('Hello World!');
});

const router = require('./routes/user.js')

app.use(router)


// localhost
app.listen(3000, function () {
  console.log('Is this thing on?')
})
