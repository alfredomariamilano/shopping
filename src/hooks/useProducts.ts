import { useEffect, useMemo } from 'react'
import useSWR from 'swr'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { setProducts } from '~/store/reducers/products'
import { Product } from '~/types'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export const useProducts = () => {
  const dispatch = useAppDispatch()
  const products = useAppSelector((state) => state.products.products)
  const search = useAppSelector((state) => state.products.search)
  const filters = useAppSelector((state) => state.products.filters)
  const url = useMemo(() => {
    const baseUrl = '/api/products'
    const params = new URLSearchParams()

    if (search) {
      params.set('search', search)
    }

    const filtersString = filters?.join(',')

    if (filtersString) {
      params.set('categories', filtersString)
    }

    const paramsString = params.toString()

    if (paramsString) {
      return `${baseUrl}?${params}`
    }

    return baseUrl
  }, [search, filters])
  const { data } = useSWR(url, fetcher)
  
  useEffect(() => {
    if (data?.products) {      
      dispatch(setProducts(data.products as Product[]))
    }
  }, [data?.products])

  return products
}