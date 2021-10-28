import { useCallback } from 'react'
import { useAppDispatch } from '~/store/hooks'
import { toggleOpen as toggleOpenAction } from '~/store/reducers/cart'

export const useToggleOpenCart = () => {
  const dispatch = useAppDispatch()

  const toggleOpen = useCallback(() => {
    dispatch(toggleOpenAction())
  }, [])

  return toggleOpen
}
