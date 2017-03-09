'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const chalk = require('chalk')
const path = require('path')
const volleyball = require('volleyball')

const app = express()
const router = require('./router')

app.use(volleyball)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, '..', 'public')))

app.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.use('/', router);

app.use(function(err, req, res, next) {
  console.error(err, typeof next)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message)
})

app.listen(process.env.PORT || 3000, function() {
  console.log(chalk.cyan("Listening on  port 3000  🐠"))
})
