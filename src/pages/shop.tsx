import type { NextPage } from 'next'
import Head from 'next/head'
import Products from '~/components/Products'
import Filters from '~/components/Filters'
import { useProducts } from '~/hooks/useProducts'

const Shop: NextPage = () => {
  const products = useProducts()

  return (
    <div>
      <Head>
        <title>Venus - Shop</title>
      </Head>
      <Filters />
      <Products products={products} />
    </div>
  )
}

export default Shop
