import products from '~/public/products.json'
import type { NextApiHandler } from 'next'
import type { Product } from '~/types'

const handleProductsId: NextApiHandler = async (request, response) => {
  const { id } = request.query

  const product = (products as Product[]).find((product) => {
    return product.productId.value === id
  })

  if (!product) {
    response.status(404)
  }

  response.json({ product })
}

export default handleProductsId
