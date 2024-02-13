import { useParams } from 'react-router-dom'

import { useAppDispatch } from '@/common/hooks/use-app-dispatch.ts'
import { useAppSelector } from '@/common/hooks/use-app-selector.ts'
import {
  setCurrentPage as onPageChange,
  setPageSize as onChangePageSize,
  setCardsSearchTerm,
  setDefaultState as setDefaultDeckState,
} from '@/feature/deck/model/slice/deck.slice.ts'

export const useDeck = () => {
  const { currentPage, pageSize } = useAppSelector(state => state.deck.pagination)
  const searchTerm = useAppSelector(state => state.deck.searchTerm)
  const { id } = useParams()

  const deckId = id as string

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

  const setDefaultState = () => {
    dispatch(setDefaultDeckState())
  }

  return {
    currentPage,
    pageSize,
    searchTerm,
    deckId,
    setCurrentPage,
    setPageSize,
    setSearchTerm,
    setDefaultState,
  }
}
