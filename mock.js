const { MoltinClient } = require('./dist')

const client = new MoltinClient({
  client_id: 'j6hSilXRQfxKohTndUuVrErLcSJWP15P347L6Im0M4'
})

client
  .get('categories')
  .then(console.log)
  .catch(console.error)
