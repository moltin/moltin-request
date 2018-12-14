import Link from 'next/link'

import moltin from '../lib/moltin'

export default class Homepage extends React.Component {
  static async getInitialProps() {
    const { data: products } = await moltin.get('products')

    return { products }
  }

  render() {
    const { products } = this.props

    return (
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <Link href={{ pathname: '/product', query: { id: product.id } }}>
              <a>{product.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    )
  }
}
