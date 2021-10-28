import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { useAppSelector } from '~/store/hooks'
import { Product } from '~/types'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const useGetCartProducts = () => {
  const [cartProducts, setCartProducts] = useState<Product[]>([])
  const cartItemsIds = useAppSelector(({ cart }) => Object.keys(cart.items))

  const { data } = useSWR(
    `/api/products?ids=${cartItemsIds.join(',') || 'none'}`,
    fetcher
  )

  useEffect(() => {
    if (data?.products) {
      setCartProducts(data.products as Product[])
    }
  }, [data?.products])

  return cartProducts
}
