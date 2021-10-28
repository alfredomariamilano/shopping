import NextLink from 'next/link'
import styled from 'styled-components'
import { HEADER_HEIGHT_REM } from '~/utils/constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSearch,
  faBookOpen,
  faStore,
  faSlidersH,
  faUser,
  faShoppingCart,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons'
import { useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { setSearch as setSearchAction } from '~/store/reducers/products'
import { useRouter } from 'next/router'
import { useToggleOpenCart } from '~/hooks/useToggleOpenCart'
import Products from '~/components/Products'
import { useGetCartProducts } from '~/hooks/useGetCartProducts'

const Container = styled.header`
  width: 100%;
  height: ${HEADER_HEIGHT_REM}rem;
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  padding: 0 1.2rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(215, 215, 215, 0.5);
  background: #ffffff;
`

const Section = styled.div`
  flex: 0 0 auto;
`

const SearchContainer = styled.div`
  flex: 1;
  padding: 0 1.5rem;
  overflow: hidden;
`

const SearchForm = styled.form`
  position: relative;
  width: 48rem;
  max-width: 100%;
  height: 2.4rem;
  border: 1px solid rgba(215, 215, 215, 0.5);
  border-radius: 5px;
  display: flex;
  align-items: center;
`

const SearchInput = styled.input`
  width: 100%;
  border: none;
  height: 100%;
  padding: 0.75rem;

  ::placeholder {
    color: #777777;
  }
`

const SearchButton = styled.button`
  width: 3rem;
  height: 100%;
  border: none;
  background: none;
  cursor: pointer;
  color: #777777;
`

const Logo = () => {
  return (
    <Section>
      <NextLink href="/">
        <h1 style={{ margin: 0, lineHeight: 1 }}>Venus</h1>
      </NextLink>
    </Section>
  )
}

const Search = () => {
  const dispatch = useAppDispatch()
  const _search = useAppSelector((state) => state.products.search)
  const [search, setSearch] = useState(_search)
  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(setSearchAction(search))
  }

  return (
    <SearchContainer>
      <SearchForm onSubmit={onSubmit}>
        <SearchInput
          placeholder="Search Venus"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <SearchButton>
          <FontAwesomeIcon icon={faSearch} />
        </SearchButton>
      </SearchForm>
    </SearchContainer>
  )
}

const NavigationContainer = styled.nav`
  flex: 0 0 auto;
  display: flex;
`

const NavigationButton = styled.button<{ active?: boolean }>`
  position: relative;
  cursor: pointer;
  height: 2.25rem;
  border: none;
  background: none;
  font-weight: 400;
  color: ${({ active }) => (active ? '#333333' : '#777777')};
  font-size: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const NavigationText = styled.span`
  font-size: 0.75rem;
  padding-top: 0.2rem;
`

const CartCounter = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  color: #ffffff;
  background: #ec6661;
  border-radius: 100%;
  width: 0.85rem;
  height: 0.85rem;
  line-height: 1;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translate(50%, -50%);
`

const CartDrawerContainer = styled.div`
  padding: 1.45rem;
  cursor: initial;
  width: 23.25rem;
  max-width: 100vw;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  background: #ffffff;
  border-left: 1px solid rgba(215, 215, 215, 0.5);
`

const CartDrawerButton = styled(NavigationButton)`
  height: auto;
  color: #38c2de;
`

const CartDrawerHeader = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const CartDrawer = () => {
  const cartProducts = useGetCartProducts()
  const toggleOpenCart = useToggleOpenCart()
  const cartItems = useAppSelector(({ cart }) => cart.items)
  const cartItemsLength = useMemo(() => {
    return Object.values(cartItems).reduce((length, quantity) => {
      return length + quantity
    }, 0)
  }, [cartItems])
  const cartTotal = useMemo(() => {
    return Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(
      cartProducts.reduce((total, product) => {
        return total + product.price * cartItems[product.productId.value]
      }, 0) / 100
    )
  }, [cartItems, cartProducts])

  return (
    <CartDrawerContainer>
      <CartDrawerHeader>
        <CartDrawerButton onClick={() => toggleOpenCart()}>
          <FontAwesomeIcon icon={faArrowRight} />
        </CartDrawerButton>
        {'Your Cart'}
        <CartDrawerButton onClick={() => toggleOpenCart()}>
          <FontAwesomeIcon icon={faShoppingCart} />
          {!!cartItemsLength && <CartCounter>{cartItemsLength}</CartCounter>}
        </CartDrawerButton>
      </CartDrawerHeader>
      <div>
        {`Total: ${cartTotal}`}
        <Products products={cartProducts} />
      </div>
    </CartDrawerContainer>
  )
}

const Navigation = () => {
  const router = useRouter()
  const cartItemsLength = useAppSelector(({ cart }) => {
    return Object.values(cart.items).reduce((length, quantity) => {
      return length + quantity
    }, 0)
  })
  const cartIsOpen = useAppSelector(({ cart }) => cart.open)
  const toggleOpenCart = useToggleOpenCart()

  return (
    <NavigationContainer>
      <NextLink href={'/recipes'}>
        <NavigationButton active={router.asPath === '/recipes'}>
          <FontAwesomeIcon icon={faBookOpen} />
          <NavigationText>{'Recipes'}</NavigationText>
        </NavigationButton>
      </NextLink>
      <NextLink href={'/shop'}>
        <NavigationButton active={router.asPath === '/shop'}>
          <FontAwesomeIcon icon={faStore} />
          <NavigationText>{'Shop'}</NavigationText>
        </NavigationButton>
      </NextLink>
      <NextLink href={'/profile'}>
        <NavigationButton active={router.asPath === '/profile'}>
          <FontAwesomeIcon icon={faUser} />
          <NavigationText>{'Profile'}</NavigationText>
        </NavigationButton>
      </NextLink>
      <NavigationButton onClick={() => toggleOpenCart()}>
        <FontAwesomeIcon icon={faShoppingCart} />
        <NavigationText>{'Cart'}</NavigationText>
        {!!cartItemsLength && <CartCounter>{cartItemsLength}</CartCounter>}
      </NavigationButton>
      {cartIsOpen && <CartDrawer />}
    </NavigationContainer>
  )
}

export const Header = () => {
  return (
    <Container>
      <Logo />
      <Search />
      <Navigation />
    </Container>
  )
}

export default Header
