const { send } = require('micro')
const { createClient } = require('@moltin/request')

const { MOLTIN_CLIENT_ID, MOLTIN_CLIENT_SECRET } = process.env

const client = new createClient({
  client_id: MOLTIN_CLIENT_ID,
  client_secret: MOLTIN_CLIENT_SECRET
})

module.exports = async (req, res) => {
  try {
    const { data } = await client.get('products')

    send(res, 200, data)
  } catch (error) {
    send(res, 500, { error })
  }
}
