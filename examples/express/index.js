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

app.get('/products/:id', async (req, res, next) => {
  const { id } = req.params
  const { data: product } = await moltin.get(`products/${id}`)

  res.render('product', { product })
})

app.listen(3000)
