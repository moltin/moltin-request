# @moltin/request

> 🎮 Minimal Moltin API request library for Node + browsers

## Install

```bash
yarn add @moltin/request # npm install @moltin/request
```

## Quickstart (implicit)

```js
import { MoltinClient } from '@moltin/request'

const client = MoltinClient({
  client_id: '...'
})

client
  .get('products')
  .then(console.log)
  .catch(console.error)
```

## Quickstart (client credentials)

```js
import { MoltinClient } from '@moltin/request'

const client = MoltinClient({
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