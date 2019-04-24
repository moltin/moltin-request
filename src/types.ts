export interface InitOptions {
  client_id: string
  client_secret?: string
  fetch?: Fetch
  storage?: StorageFactory
  host?: string
  version?: string
  application?: string
  currency?: string
  customer_token?: string
  headers?: Headers
}

export interface Options {
  fetch?: Fetch
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

export interface StorageFactory {
  set(key: string, value: string): void
  get(key: string): string | null
  delete(key: string): void
}

export interface Fetch {
  (input?: Request | string, init?: RequestInit): Promise<Response>
}

export interface Credentials {
  client_id: string
  access_token: string
  expires: number
}
