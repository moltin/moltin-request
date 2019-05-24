const { ApolloServer, gql } = require('apollo-server')
const MoltinClient = require('@moltin/request')

const moltin = new MoltinClient({
  client_id: 'h93GLWVTdw3EUd9ev7g8Z7ROq54s5JVAzivz9ZrIe1'
})

const typeDefs = gql`
  type Query {
    products: [Product]
  }

  type Product {
    id: ID
    name: String
    slug: String
    description: String
    price: [ProductPrice]
  }

  type ProductPrice {
    amount: Int
    currency: String
    includes_tax: Boolean
  }
`

const resolvers = {
  Query: {
    products: async (_, args, { moltin }) => {
      const { data: products } = await moltin.get('products')

      return products
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    moltin
  }
})

server.listen().then(({ url }) => console.log(`🚀  Server ready at ${url}`))
