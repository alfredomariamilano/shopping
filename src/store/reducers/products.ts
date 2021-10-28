import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '~/types'

export type ProductsState = {
  products: Product[]
  filters: Product["category"][]
  search: string
}

const initialState: ProductsState = {
  products: [],
  filters: [],
  search: ''
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload
    },
    addFilter(state, action: PayloadAction<Product["category"]>) {
      state.filters.push(action.payload)
    },
    removeFilter(state, action: PayloadAction<Product["category"]>) {
      state.filters = state.filters.filter(filter => filter !== action.payload)
    },
    toggleFilter(state, action: PayloadAction<Product["category"]>) {
      if (state.filters.includes(action.payload)) {
        state.filters = state.filters.filter(filter => filter !== action.payload)
      } else {
        state.filters.push(action.payload)
      }
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload
    },
  },
})

export const {
  setProducts,
  addFilter,
  removeFilter,
  toggleFilter,
  setSearch
} = productsSlice.actions

export default productsSlice
