import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { useAppSelector } from '~/store/hooks'
import { Product } from '~/types'

const noop = () => {}
const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const useProductById = (id: string) => {
  const localProduct = useAppSelector((state) => {
    return state.products.products.find((p) => p.productId.value === id)
  })
  const [remoteProduct, setRemoteProduct] = useState<Product>()
  const { data } = useSWR(`/api/products/${id}`, localProduct ? noop : fetcher)

  useEffect(() => {
    if (data?.product) {
      setRemoteProduct(data.product as Product)
    }
  }, [data?.product])

  return localProduct || remoteProduct
}
