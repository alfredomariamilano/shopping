import styled from 'styled-components'
import { useCategories } from '~/hooks/useCategories'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { toggleFilter } from '~/store/reducers/products'
import { FILTERS_GAP_REM } from '~/utils/constants'

const FiltersOuterContainer = styled.section`
  position: relative;
  overflow: hidden;
  margin-top: 1rem;
  margin-bottom: 2.5rem;
  color: #333333;
`

const FiltersHeader = styled.section`
  font-size: 0.75rem;
  font-weight: 700;
`

const FiltersInnerContainer = styled.div`
  width: calc(100% + ${FILTERS_GAP_REM * 2}rem);
  min-width: calc(100% + ${FILTERS_GAP_REM * 2}rem);
  max-width: calc(100% + ${FILTERS_GAP_REM * 2}rem);
  margin-top: -${FILTERS_GAP_REM}rem;
  margin-bottom: -${FILTERS_GAP_REM}rem;
  margin-left: -${FILTERS_GAP_REM}rem;
  display: flex;
  flex-wrap: wrap;
`

const Filter = styled.button<{ active: boolean }>`
  cursor: pointer;
  margin: ${FILTERS_GAP_REM}rem;
  padding: 0.5rem;
  border: 1.5px solid ${({ active }) => (active ? '#ec6661' : '#e1e1e1')};
  border-radius: 999px;
  flex: 0 0 auto;
  line-height: 1;
  background: none;
`

export const Filters = () => {
  const dispatch = useAppDispatch()
  const filters = useAppSelector((state) => state.products.filters)
  const categories = useCategories()

  return (
    <>
      <FiltersHeader>Shop by category</FiltersHeader>
      <FiltersOuterContainer>
        <FiltersInnerContainer>
          {categories.map((category) => {
            return (
              <Filter
                key={category}
                active={filters.includes(category)}
                onClick={() => dispatch(toggleFilter(category))}
              >
                {category}
              </Filter>
            )
          })}
        </FiltersInnerContainer>
      </FiltersOuterContainer>
    </>
  )
}

export default Filters
