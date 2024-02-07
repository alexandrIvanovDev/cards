import { useAppDispatch } from '@/common/hooks/use-app-dispatch.ts'
import { useAppSelector } from '@/common/hooks/use-app-selector.ts'
import {
  setCurrentPage as onPageChange,
  setPageSize as onChangePageSize,
  setCardsSearchTerm,
} from '@/feature/deck/model/slice/deck.slice.ts'

export const useDeck = () => {
  const { currentPage, pageSize } = useAppSelector(state => state.deck.pagination)
  const searchTerm = useAppSelector(state => state.deck.searchTerm)

  const dispatch = useAppDispatch()

  const setCurrentPage = (page: number) => {
    dispatch(onPageChange(page))
  }

  const setPageSize = (pageSize: number) => {
    dispatch(onChangePageSize(pageSize))
  }

  const setSearchTerm = (value: string) => {
    dispatch(setCardsSearchTerm(value))
  }

  return { currentPage, pageSize, searchTerm, setCurrentPage, setPageSize, setSearchTerm }
}
