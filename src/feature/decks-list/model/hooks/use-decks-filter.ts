import { useAppDispatch } from '@/common/hooks/use-app-dispatch.ts'
import { useAppSelector } from '@/common/hooks/use-app-selector.ts'
import {
  setCardsCount as onChangeCardsCount,
  setTabValue as onChangeTabValue,
  setSearchTerm as onChangeSearchTerm,
  setCurrentPage,
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
    // TODO fix
    dispatch(setCurrentPage(1))
  }

  const setSearchTerm = (value: string) => {
    dispatch(onChangeSearchTerm(value))
    // TODO fix
    dispatch(setCurrentPage(1))
  }

  return { searchTerm, cardsCount, tabValue, setSearchTerm, setCardsCount, setTabValue }
}
