<img src="https://www.elasticpath.com/themes/custom/bootstrap_sass/logo.svg" alt="" width="400" />

# Elastic Path Commerce Cloud @moltin/request

[![npm version](https://img.shields.io/npm/v/@moltin/request.svg)](https://www.npmjs.com/package/@moltin/request) 
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) 
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/moltin/moltin-request/issues)
[![follow on Twitter](https://img.shields.io/twitter/follow/elasticpath?style=social&logo=twitter)](https://twitter.com/intent/follow?screen_name=elasticpath)

> 🎮 Minimal Elastic Path Commerce Cloud API request library for Node

[Examples](https://github.com/moltin/examples) &middot; [API Reference](https://documentation.elasticpath.com/commerce-cloud/docs/api/index.html)

## Installation

```bash
yarn add @moltin/request # npm install @moltin/request
```

## Quickstart (implicit)

```js
const { MoltinClient } = require('@moltin/request')
// import { MoltinClient } from '@moltin/request'

const client = new MoltinClient({
  client_id: '...'
})

client
  .get('products')
  .then(console.log)
  .catch(console.error)
```

## Quickstart (client credentials)

⚠️ You should not use client credentials on the client-side. You will expose your client secret, read more about authentication [here](https://documentation.elasticpath.com/commerce-cloud/docs/api/basics/authentication/index.html).

```js
const { MoltinClient } = require('@moltin/request')
// import { MoltinClient } from '@moltin/request'

const client = new MoltinClient({
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

## Quickstart (with storage)

To prevent unnecessary authentication requests, you will want to use a storage adapter.

### Node Local Storage

```js
const { MoltinClient } = require('@moltin/request')
const NodeStorageAdapter = require('@moltin/node-storage-adapter')

const client = new MoltinClient({
  client_id: '...',
  storage: new NodeStorageAdapter('./localStorage')
})

client
  .get('products')
  .then(console.log)
  .catch(console.error)
```

### `window.localStorage`

```js
const { MoltinClient } = require('@moltin/request')

class LocalStorageAdapter {
  set(key, value) {
    return window.localStorage.setItem(key, value)
  }

  get(key) {
    return window.localStorage.getItem(key)
  }

  delete(key) {
    return window.localStorage.removeItem(key)
  }
}

const client = new MoltinClient({
  client_id: '...',
  storage: new LocalStorageAdapter()
})

client
  .get('products')
  .then(console.log)
  .catch(console.error)
```

## Quickstart (with custom fetch)

This library uses [cross-fetch](https://github.com/lquixada/cross-fetch) to make requests. If you wish to change this library, you can pass a custom fetch when instantiating a new moltin client.

```js
const { MoltinClient } = require('@moltin/request')
const fetchEverywhere = require('fetch-everywhere')

const client = new MoltinClient({
  client_id: '...',
  fetch: fetchEverywhere
})

client
  .get('products')
  .then(console.log)
  .catch(console.error)
```

## Kitchen sink

```js
const { MoltinClient } = require('@moltin/request')
// import { MoltinClient } from '@moltin/request'

const client = new MoltinClient({
  client_id: '...',
  client_secret: '...',
  fetch: customFetch,
  storage: new NodeStorageAdapter('./moltin'),
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

The Elastic Path Commerce Cloud API provides you the ability to send various request headers that change the way data is stored or retrieved.

By default this library will encode all data as JSON, however you can customise this by setting your own `Content-Type` header as an additional argument to `get`, `post`, `put` and `delete`.

This argument can be used to get products by enabled currency, language or even use for uploading files to Elastic Path Commerce Cloud.

**Note**: If you add the `Content-Type` custom header to `post`, `put` or `delete` you will need to encode `data` yourself.

```js
const { MoltinClient } = require('@moltin/request')

const client = new MoltinClient({
  client_id: '...'
})

const headers = {
  'X-Moltin-Currency': 'gbp'
}

client
  .get('products', headers)
  .then(console.log)
  .catch(console.error)
```

## Terms And Conditions

- Any changes to this project must be reviewed and approved by the repository owner. For more information about contributing, see the [Contribution Guide](https://github.com/moltin/gatsby-demo-store/blob/master/.github/CONTRIBUTING.md).
- For more information about the license, see [MIT License](https://github.com/moltin/moltin-request/blob/master/LICENSE).
