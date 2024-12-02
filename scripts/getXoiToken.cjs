#!/usr/bin/env node
const axios = require('axios')
const dotenv = require('dotenv')

dotenv.config()

const url = 'https://api-users-external.dev.xoeye.com/devl/token'
const headers = {
  'Content-Type': 'application/x-amz-json-1.1',
  Accept: 'application/json',
}

const data = {
  api_key: process.env.XOI_API_KEY,
  api_secret: process.env.XOI_API_SECRET,
}
;(async () => {
  const response = await axios.post(url, data, { headers })
  process.stdout.write(response.data.token)
})()
