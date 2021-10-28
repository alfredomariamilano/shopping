import type { Product as ProductType } from '~/types'
import styled from 'styled-components'
import {
  PRODUCTS_HORIZONTAL_GAP_REM,
  PRODUCTS_VERTICAL_GAP_REM,
} from '~/utils/constants'
import { useMemo } from 'react'
import { useCartProduct } from '~/hooks/useCartProduct'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons'

interface ProductProps {
  product: ProductType
}

const ProductContainer = styled.div`
  margin: ${PRODUCTS_VERTICAL_GAP_REM}rem ${PRODUCTS_HORIZONTAL_GAP_REM}rem;
  width: max(12rem, calc(25% - ${PRODUCTS_HORIZONTAL_GAP_REM * 2}rem));
  height: 17.75rem;
  flex: 0 0 auto;
  line-height: 1;
  text-align: center;
  font-weight: 400;
  display: flex;
  flex-direction: column;
`

const Image = styled.div`
  width: 100%;
  height: 9.5rem;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`

const Brand = styled.h6`
  font-size: 0.7rem;
  margin: 0.2rem 0;
  line-height: 1;

  ::after {
    content: 'I';
    color: transparent;
  }
`

const Name = styled.h4<{ small: boolean }>`
  font-size: ${({ small }) => (small ? 0.8 : 0.9)}rem;
  margin: 0.3rem 0;
  line-height: 1.1;
  font-weight: 500;
`

const Subtitle = styled.h5`
  font-size: 0.75rem;
  margin: 0.2rem 0;
  line-height: 1.1;
  color: #777777;
`

const Price = styled.h6`
  font-size: 1rem;
  margin: 0.2rem 0;
  line-height: 1.1;
`

const ButtonsContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`

const Button = styled.button`
  cursor: pointer;
  height: 2.25rem;
  border: 1px solid #d7d7d7;
  background: none;
  font-weight: 500;
`

const AddToCartButton = styled(Button)`
  width: 100%;
  color: #38c2de;
`

const AddOrRemoveButton = styled(Button)`
  border: none;
  width: 2.25rem;
  color: #ffffff;
  background-color: #38c2de;
`

const CartInput = styled.input`
  width: 2.25rem;
  height: 2.25rem;
  border: 1px solid rgba(215, 215, 215, 0.5);
  margin: 0 0.75rem;
  text-align: center;

  ::placeholder {
    color: #777777;
  }

  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
  }
`

export const Product = (props: ProductProps) => {
  const { product } = props
  const { cartQuantity, addToCart, removeFromCart, setQuantity } =
    useCartProduct(product)

  const formattedPrice = useMemo(() => {
    return Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(product.price / 100)
  }, [product.price])

  return (
    <ProductContainer>
      <Image
        style={{
          backgroundImage: `url('${product.imageUrl}')`,
        }}
      />
      <Brand>{product.brand}</Brand>
      <Name small={!!product.subtitle}>{product.name}</Name>
      {product.subtitle && <Subtitle>{product.subtitle}</Subtitle>}
      <Price>{formattedPrice}</Price>
      <ButtonsContainer>
        {!cartQuantity && (
          <AddToCartButton onClick={() => addToCart()}>
            <FontAwesomeIcon
              icon={faPlusCircle}
              style={{
                marginRight: '0.1rem',
              }}
            />
            {'Add to Cart'}
          </AddToCartButton>
        )}
        {!!cartQuantity && (
          <>
            <AddOrRemoveButton onClick={() => removeFromCart()}>
              <FontAwesomeIcon icon={faMinusCircle} />
            </AddOrRemoveButton>
            <CartInput
              type="number"
              value={cartQuantity}
              onChange={({ target }) => setQuantity(parseInt(target.value))}
            />
            <AddOrRemoveButton onClick={() => addToCart()}>
              <FontAwesomeIcon icon={faPlusCircle} />
            </AddOrRemoveButton>
          </>
        )}
      </ButtonsContainer>
    </ProductContainer>
  )
}

export default Product
