import fetch from 'cross-fetch'

import * as types from './types'
import { removeLeadingSlash } from './utils'
export { createCartIdentifier, getChildId } from './utils'

export class MoltinClient {
  private client_id: string
  private client_secret?: string
  private storage?: types.StorageFactory
  private options?: types.Options
  private fetch?: types.Fetch

  constructor(options: types.InitOptions) {
    const { client_id, client_secret, storage, ...others } = options

    this.client_id = client_id
    this.client_secret = client_secret ? client_secret : undefined
    this.storage = storage
    this.fetch = options.fetch ? options.fetch : fetch
    this.options = {
      host: options.host ? options.host : 'api.moltin.com',
      version: options.version ? options.version : 'v2',
      ...others
    }
  }

  async request(
    method: string,
    path: string,
    data: object = undefined,
    requestHeaders: types.Headers = {}
  ) {
    const {
      client_id,
      storage,
      options: {
        application,
        currency,
        customer_token,
        host,
        version,
        headers: classHeaders
      }
    } = this

    const uri: string = `https://${host}/${version}/${removeLeadingSlash(path)}`

    const customHeaders = {
      ...classHeaders,
      ...requestHeaders
    }

    let credentials: types.Credentials
    let access_token: string

    if (storage) {
      credentials = await JSON.parse(storage.get('moltinCredentials'))
    }

    access_token =
      !credentials ||
      !credentials.access_token ||
      credentials.client_id !== client_id ||
      Math.floor(Date.now() / 1000) >= credentials.expires
        ? await this.authenticate()
        : credentials.access_token

    const headers: types.Headers = {
      'Content-Type': 'application/json',
      'X-MOLTIN-SDK-LANGUAGE': 'JS-REQUEST',
      Authorization: `Bearer ${access_token}`,
      ...(application && { 'X-MOLTIN-APPLICATION': application }),
      ...(currency && { 'X-MOLTIN-CURRENCY': currency }),
      ...(customer_token && { 'X-MOLTIN-CUSTOMER-TOKEN': customer_token }),
      ...customHeaders
    }

    const body = customHeaders['Content-Type']
      ? data
      : { body: JSON.stringify({ data }) }

    const response = await this.fetch(uri, {
      method,
      headers,
      ...(data && body)
    })

    if (response.status === 204) return response.text()

    const json = await response.json()

    if (!response.ok) {
      throw {
        statusCode: response.status,
        ...json
      }
    }

    return json
  }

  async authenticate() {
    const {
      client_id,
      client_secret,
      storage,
      options: { host }
    } = this

    if (!client_id) {
      throw new Error('You must provide a client_id')
    }

    const uri: string = `https://${host}/oauth/access_token`

    const body: types.AuthBody = {
      grant_type: client_secret ? 'client_credentials' : 'implicit',
      client_id,
      ...(client_secret && { client_secret })
    }

    const response = await this.fetch(uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-MOLTIN-SDK-LANGUAGE': 'JS-REQUEST'
      },
      body: Object.keys(body)
        .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(body[k])}`)
        .join('&')
    })

    const { access_token, expires }: types.Credentials = await response.json()

    if (!access_token) {
      throw new Error('Unable to obtain an access token')
    }

    if (storage) {
      const credentials = {
        client_id,
        access_token,
        expires
      }

      await storage.set('moltinCredentials', JSON.stringify(credentials))
    }

    return access_token
  }

  post(path: string, data: object, headers?: types.Headers) {
    return this.request('POST', path, data, headers)
  }

  get(path: string, headers?: types.Headers) {
    return this.request('GET', path, undefined, headers)
  }

  put(path: string, data: object, headers?: types.Headers) {
    return this.request('PUT', path, data, headers)
  }

  delete(path: string, data: object, headers?: types.Headers) {
    return this.request('DELETE', path, data, headers)
  }
}
