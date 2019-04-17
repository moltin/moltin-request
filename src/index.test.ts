import { createClient } from './'

describe('config', () => {
  it('requires a client_id', async () => {
    const client = new createClient({ client_id: '' })
    expect.assertions(1)

    try {
      await client.authenticate()
    } catch (error) {
      expect(error.message).toEqual('You must provide a client_id')
    }
  })

  it('cannot authenticate with incorrect client_id', async () => {
    const client = new createClient({ client_id: 'X' })
    expect.assertions(1)

    try {
      await client.authenticate()
    } catch (error) {
      expect(error.message).toEqual('Unable to obtain an access token')
    }
  })
})
