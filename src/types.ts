export interface InitOptions {
  client_id: string
  client_secret?: string
  host?: string
  version?: string
  application?: string
  currency?: string
  customer_token?: string
  headers?: Headers
}

export interface Options {
  application?: string
  currency?: string
  customer_token?: string
  host?: string
  version?: string
  headers?: Headers
}

export interface Headers {
  [key: string]: string
}

export interface AuthBody {
  grant_type: 'client_credentials' | 'implicit'
  client_id: string
  client_secret?: string
}
