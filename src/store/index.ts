import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import products from './reducers/products'
import cart from './reducers/cart'

export function makeStore() {
  return configureStore({
    reducer: {
      [products.name]: products.reducer, 
      [cart.name]: cart.reducer
    },
  })
}

export const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>
