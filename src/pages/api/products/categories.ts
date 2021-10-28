import products from '~/public/products.json'
import type { NextApiHandler } from 'next'
import type { Product } from '~/types'

const handleProductsId: NextApiHandler = async (request, response) => {
  const categories = Array.from(
    new Set(
      (products as Product[])
        .map((product) => {
          return product.category
        })
        .filter(category => category)
    )
  )

  response.json({ categories })
}

export default handleProductsId
