const meow = require('meow')
const { MoltinClient } = require('@moltin/request')
const ora = require('ora')

const moltin = new MoltinClient({
  client_id: 'h93GLWVTdw3EUd9ev7g8Z7ROq54s5JVAzivz9ZrIe1'
})

const cli = meow(
  `
  Usage
    $ moltin [command]

  Examples
    $ moltin products
    $ moltin categories
    $ moltin brands
`
)

async function main(cli) {
  const [command] = cli.input

  const spinner = ora().start()

  switch (command) {
    case 'products':
      const { data: products } = await moltin.get('products')
      return spinner.succeed(JSON.stringify(products))

    case 'categories':
      const { data: categories } = await moltin.get('categories')
      return spinner.succeed(JSON.stringify(categories))

    case 'brands':
      const { data: brands } = await moltin.get('brands')
      return spinner.succeed(JSON.stringify(brands))

    default:
      spinner.fail('no valid command specified')
      return cli.showHelp()
  }
}

main(cli).catch(console.error)
