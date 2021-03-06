import fetch from 'cross-fetch'

import { MoltinClient } from './'

describe('config', () => {
  it('requires a client_id', async () => {
    const client = new MoltinClient({ client_id: '' })
    expect.assertions(1)

    try {
      await client.authenticate()
    } catch (error) {
      expect(error.message).toEqual('You must provide a client_id')
    }
  })

  it('cannot authenticate with incorrect client_id', async () => {
    const client = new MoltinClient({ client_id: 'X' })
    expect.assertions(1)

    try {
      await client.authenticate()
    } catch (error) {
      expect(error.message).toEqual('Unable to obtain an access token')
    }
  })

  it('can fetch using provided fetch library', async () => {
    const client = new MoltinClient({ client_id: 'X', fetch })
    expect.assertions(1)

    try {
      await client.authenticate()
    } catch (error) {
      expect(error.message).toEqual('Unable to obtain an access token')
    }
  })
})
