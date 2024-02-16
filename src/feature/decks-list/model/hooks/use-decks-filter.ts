import { useAppDispatch } from '@/common/hooks/use-app-dispatch.ts'
import { useAppSelector } from '@/common/hooks/use-app-selector.ts'
import {
  setCardsCount as onChangeCardsCount,
  setCurrentPage,
  setSearchTerm as onChangeSearchTerm,
  setTabValue as onChangeTabValue,
} from '@/feature/decks-list/model/slice'

export const useDecksFilter = () => {
  const { searchTerm, cardsCount, tabValue } = useAppSelector(state => state.decksList.filter)

  const dispatch = useAppDispatch()

  const setTabValue = (value: string) => {
    dispatch(onChangeTabValue(value))
    dispatch(setCurrentPage(1))
  }

  const setCardsCount = (value: Array<number>) => {
    dispatch(onChangeCardsCount(value))
  }

  const setSearchTerm = (value: string) => {
    dispatch(onChangeSearchTerm(value))
  }

  return { searchTerm, cardsCount, tabValue, setSearchTerm, setCardsCount, setTabValue }
}
