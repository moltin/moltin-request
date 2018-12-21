# @moltin/request

[![npm version](https://img.shields.io/npm/v/@moltin/request.svg)](https://www.npmjs.com/package/@moltin/request) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

> 🎮 Minimal Moltin API request library for Node

## Installation

```bash
yarn add @moltin/request # npm install @moltin/request
```

## Quickstart (implicit)

```js
const { createClient } = require('@moltin/request')
// import { createClient } from '@moltin/request'

const client = new createClient({
  client_id: '...'
})

client
  .get('products')
  .then(console.log)
  .catch(console.error)
```

## Quickstart (client credentials)

⚠️ You should not use client credentials on the client-side. You will expose your client secret, read more about authentication [here](https://docs.moltin.com/basics/authentication).

```js
const { createClient } = require('@moltin/request')
// import { createClient } from '@moltin/request'

const client = new createClient({
  client_id: '...',
  client_secret: '...'
})

client
  .post('brands', {
    name: 'My Special Brand',
    slug: 'my-special-brand',
    status: 'live'
  })
  .then(console.log)
  .catch(console.error)

client
  .put('brands/:id', {
    name: 'My Special Brand!'
  })
  .then(console.log)
  .catch(console.error)

client
  .delete('brands/:id')
  .then(console.log)
  .catch(console.error)
```

## Kitchen sink

```js
const { createClient } = require('@moltin/request')
// import { createClient } from '@moltin/request'

const client = new createClient({
  client_id: '...',
  client_secret: '...',
  host: '...',
  version: '...',
  application: '...',
  currency: '...',
  customer_token: '...',
  headers: {
    // ...
  }
})
```

## Custom headers per request

The Moltin API provides you the ability to send various request headers that change the way data is stored or retrieved.

By default this library will encode all data as JSON, however you can customise this by setting your own `Content-Type` header as an additional argument to `get`, `post`, `put` and `delete`.

This argument can be used to get products by enabled currency, language or even use for uploading files to Moltin.

**Note**: If you add the `Content-Type` custom header to `post`, `put` or `delete` you will need to encode `data` yourself.

```js
const { createClient } = require('@moltin/request')

const client = new createClient({
  client_id: '...'
})

const headers = {
  "X-Moltin-Currency": "gbp"
}

client
  .get('products', headers)
  .then(console.log)
  .catch(console.error)
```

## Examples

The examples below demonstrate how you connect this library with other frameworks and tools.

- [Express](/examples/express)
- [Next.js](/examples/next)
- [CLI app](/examples/cli-app)
- [Zeit micro](/examples/micro)
- [Apollo GraphQL Server](/examples/apollo-server)
