export interface Options {
  client_id?: string
  client_secret?: string
  application?: string
  currency?: string
  host?: string
  version?: string
  customer_token?: string
}

export interface Headers {
  [key: string]: string
}

export interface AuthBody {
  grant_type: 'client_credentials' | 'implicit'
  client_id: string
  client_secret?: string
}
