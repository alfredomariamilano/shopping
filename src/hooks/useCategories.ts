import { useEffect, useState } from 'react'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export const useCategories = () => {
  const [categories, setCategories] = useState<string[]>([])
  const { data } = useSWR('/api/products/categories', fetcher)
  
  useEffect(() => {
    if (data?.categories) {      
      setCategories(data.categories)
    }
  }, [data?.categories])

  return categories
}