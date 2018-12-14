import moltin from '../lib/moltin'

export default class ProductPage extends React.Component {
  static async getInitialProps({ query }) {
    const { id } = query
    const { data: product } = await moltin.get(`/products/${id}`)

    return { product }
  }

  render() {
    const { product } = this.props

    return (
      <div>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
      </div>
    )
  }
}
