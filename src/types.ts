export interface InitOptions {
  client_id: string
  client_secret?: string
  application?: string
  currency?: string
  customer_token?: string
}

export interface Options {
  application?: string
  currency?: string
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
