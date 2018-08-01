// const fetchMock = require('fetch-mock')
import MoltinClient from './'

describe('client host', () => {
  it('custom is set', () => {
    const client = new MoltinClient({
      host: 'myapi.moltin.com'
    })

    expect(client.host).toBe('myapi.moltin.com')
  })

  it('fallback to default', () => {
    const client = new MoltinClient({})

    expect(client.host).toBe('api.moltin.com')
  })
})

describe('headers', () => {
  it('access_token is set', () => {
    const client = new MoltinClient({
      access_token: 'abc'
    })

    expect(client.headers).toHaveProperty('Authorization', 'Bearer abc')
  })

  it('application is set', () => {
    const client = new MoltinClient({
      application: 'moltin'
    })

    expect(client.headers).toHaveProperty('X-MOLTIN-APPLICATION', 'moltin')
  })

  it('currency is set', () => {
    const client = new MoltinClient({
      currency: 'GBP'
    })

    expect(client.headers).toHaveProperty('X-MOLTIN-CURRENCY', 'GBP')
  })

  it('customer token is set', () => {
    const client = new MoltinClient({
      customer_token: 'abc'
    })

    expect(client.headers).toHaveProperty('X-MOLTIN-CUSTOMER-TOKEN', 'abc')
  })
})
