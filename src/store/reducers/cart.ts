import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '~/types'

export type CartState = {
  items: {
    [key: Product['productId']['value']]: number
  }
  open: boolean
}

const initialState: CartState = {
  items: {},
  open: false,
}

export interface CartItemPayload {
  id: Product['productId']['value']
  quantity: number
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItemPayload>) {
      const { id, quantity } = action.payload
      state.items[id] = (state.items[id] || 0) + quantity
    },
    removeFromCart(state, action: PayloadAction<CartItemPayload>) {
      const { id, quantity } = action.payload
      state.items[id] = (state.items[id] || 0) - quantity

      if (!state.items[id] || state.items[id] <= 0) {
        delete state.items[id]
      }
    },
    setQuantity(state, action: PayloadAction<CartItemPayload>) {
      const { id, quantity } = action.payload

      if (!quantity || Number.isNaN(quantity)) {
        delete state.items[id]
        return
      }

      state.items[id] = quantity
    },
    toggleOpen(state) {
      state.open = !state.open
    },
  },
})

export const { addToCart, removeFromCart, setQuantity, toggleOpen } =
  cartSlice.actions

export default cartSlice
