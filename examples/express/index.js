const express = require('express')
const { createClient } = require('@moltin/request')

const app = express()
const moltin = new createClient({
  client_id: 'h93GLWVTdw3EUd9ev7g8Z7ROq54s5JVAzivz9ZrIe1'
})

app.set('view engine', 'pug')

app.get('/', async (req, res, next) => {
  const { data: products } = await moltin.get('products')

  res.render('index', { products })
})

app.listen(3000)
