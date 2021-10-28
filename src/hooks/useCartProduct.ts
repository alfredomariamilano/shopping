import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import {
  addToCart as addToCartAction,
  removeFromCart as removeFromCartAction,
  setQuantity as setQuantityAction,
} from '~/store/reducers/cart'
import { Product } from '~/types'
import { useToggleOpenCart } from '~/hooks/useToggleOpenCart'

export const useCartProduct = (product: Product) => {
  const dispatch = useAppDispatch()
  const toggleOpen = useToggleOpenCart()
  const cartQuantity = useAppSelector(
    ({ cart }) => cart.items[product.productId.value]
  )

  const addToCart = useCallback(
    (quantity: number = 1) => {
      dispatch(
        addToCartAction({
          id: product.productId.value,
          quantity,
        })
      )
    },
    [product.productId.value]
  )

  const removeFromCart = useCallback(
    (quantity: number = 1) => {
      dispatch(
        removeFromCartAction({
          id: product.productId.value,
          quantity,
        })
      )
    },
    [product.productId.value]
  )

  const setQuantity = useCallback(
    (quantity: number = 0) => {
      dispatch(
        setQuantityAction({
          id: product.productId.value,
          quantity,
        })
      )
    },
    [product.productId.value]
  )

  return {
    cartQuantity,
    addToCart,
    removeFromCart,
    setQuantity,
    toggleOpen,
  }
}
