import styled from 'styled-components'
import Product from './Product'
import {
  PRODUCTS_HORIZONTAL_GAP_REM,
  PRODUCTS_VERTICAL_GAP_REM,
} from '~/utils/constants'
import { Product as ProductType } from '~/types'

const ProductsOuterContainer = styled.section`
  position: relative;
  overflow: hidden;
`

const ProductsInnerContainer = styled.div`
  width: calc(100% + ${PRODUCTS_HORIZONTAL_GAP_REM * 2}rem);
  min-width: calc(100% + ${PRODUCTS_HORIZONTAL_GAP_REM * 2}rem);
  max-width: calc(100% + ${PRODUCTS_HORIZONTAL_GAP_REM * 2}rem);
  margin-top: -${PRODUCTS_VERTICAL_GAP_REM}rem;
  margin-bottom: -${PRODUCTS_VERTICAL_GAP_REM}rem;
  margin-left: -${PRODUCTS_HORIZONTAL_GAP_REM}rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const Products = ({ products }: { products: ProductType[] }) => {
  return (
    <ProductsOuterContainer>
      <ProductsInnerContainer>
        {products.map((product) => {
          return <Product key={product.productId.value} product={product} />
        })}
      </ProductsInnerContainer>
    </ProductsOuterContainer>
  )
}

export default Products
