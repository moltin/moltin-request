import 'cross-fetch/polyfill'

import { InitOptions, Options, Headers, AuthBody } from './types'
import { removeLeadingSlash } from './utils'

export class createClient {
  private client_id: string
  private client_secret?: string
  private options?: Options

  constructor(options: InitOptions) {
    const { client_id, client_secret, ...others } = options

    this.client_id = client_id
    this.client_secret = client_secret ? client_secret : undefined
    this.options = {
      host: options.host ? options.host : 'api.moltin.com',
      version: options.version ? options.version : 'v2',
      ...others
    }
  }

  async request(method: string, path: string, data: object = undefined) {
    try {
      const {
        application,
        currency,
        customer_token,
        host,
        version,
        headers: customHeaders
      } = this.options
      const uri: string = `https://${host}/${version}/${removeLeadingSlash(
        path
      )}`
      const headers: Headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await this.authenticate()}`,
        ...(application && { 'X-MOLTIN-APPLICATION': application }),
        ...(currency && { 'X-MOLTIN-CURRENCY': currency }),
        ...(customer_token && { 'X-MOLTIN-CUSTOMER-TOKEN': customer_token }),
        ...customHeaders
      }

      const response = await fetch(uri, {
        method,
        headers,
        ...(data && { body: JSON.stringify({ data }) })
      })
      const json = await response.json()

      if (response.ok) {
        return json
      }

      return {
        errors: json.errors
      }
    } catch (errors) {
      return {
        errors
      }
    }
  }

  async authenticate() {
    const { client_id, client_secret } = this

    if (!client_id) {
      throw new Error('You must provide a client_id')
    }

    const uri: string = 'https://api.moltin.com/oauth/access_token'
    const body: AuthBody = {
      grant_type: client_secret ? 'client_credentials' : 'implicit',
      client_id,
      ...(client_secret && { client_secret })
    }

    const response = await fetch(uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: Object.keys(body)
        .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(body[k])}`)
        .join('&')
    })

    const { access_token }: { access_token: string } = await response.json()

    if (!access_token) {
      throw new Error('Unable to obtain an access token')
    }

    return access_token
  }

  post(path: string, data: object) {
    return this.request('POST', path, data)
  }

  get(path: string) {
    return this.request('GET', path)
  }

  put(path: string, data: object) {
    return this.request('PUT', path, data)
  }

  delete(path: string) {
    return this.request('DELETE', path)
  }
}
