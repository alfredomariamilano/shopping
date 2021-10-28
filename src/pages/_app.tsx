import '@csstools/normalize.css'
import '~/styles/globals.css'
import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import { store } from '~/store'
import Header from '~/components/Header'
import { HEADER_HEIGHT_REM } from '~/utils/constants'
import styled from 'styled-components'

const MainContainer = styled.div`
  width: 100%;
  padding: 0 0.75rem;
  max-width: 900px;
  margin: 0 auto;
  margin-top: 1.5rem;
  padding-top: ${HEADER_HEIGHT_REM}rem;
  min-height: 100vh;
`

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Header />
      <MainContainer>
        <Component {...pageProps} />
      </MainContainer>
    </Provider>
  )
}
