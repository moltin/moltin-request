const { createClient } = require('./dist')

const client = new createClient({
  client_id: 'j6hSilXRQfxKohTndUuVrErLcSJWP15P347L6Im0M4'
})

client.get('products').then(console.log)
