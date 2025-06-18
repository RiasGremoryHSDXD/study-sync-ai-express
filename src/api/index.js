// api/index.js (CommonJS because Vercel Serverless prefers it)

const express = require('express')
const { getUser } = require('../src/Services/GetUser.cjs')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello from Vercel Express API!')
})

app.get('/api/enrollments', async (req, res) => {
  try {
    const enrollments = await getUser()
    res.status(200).send(enrollments)
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

module.exports = app

// api/index.js (continued)
const serverless = require('serverless-http')
module.exports.handler = serverless(app)
