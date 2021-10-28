import products from '~/public/products.json'
import type { NextApiHandler } from 'next'

const handleProducts: NextApiHandler = async (request, response) => {
  const { ids, categories, search } = request.query
  let _products = [...products]

  if (typeof ids === 'string') {
    const idsArray = ids
      .split(',')
      .filter((id) => id)
      .map((id) => id.trim())

    _products = _products.filter((product) => {
      return idsArray.includes(product.productId.value)
    })
  }

  if (typeof categories === 'string') {
    const categoriesArray = categories
      .split(',')
      .filter((category) => category)
      .map((category) => category.trim())

    _products = _products.filter((product) => {
      return categoriesArray.includes(product.category)
    })
  }

  if (typeof search === 'string') {
    const searchLowerCase = search.toLowerCase()

    _products = _products.filter((product) => {
      return JSON.stringify(product).match(searchLowerCase)
    })
  }

  response.json({ products: _products })
}

export default handleProducts
