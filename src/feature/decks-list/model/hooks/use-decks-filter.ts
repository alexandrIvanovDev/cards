import { useAppDispatch } from '@/common/hooks/use-app-dispatch.ts'
import { useAppSelector } from '@/common/hooks/use-app-selector.ts'
import {
  setCardsCount as onChangeCardsCount,
  setTabValue as onChangeTabValue,
  setSearchTerm as onChangeSearchTerm,
} from '@/feature/decks-list/model/slice'

export const useDecksFilter = () => {
  const { searchTerm, cardsCount, tabValue } = useAppSelector(state => state.decksList.filter)

  const dispatch = useAppDispatch()

  const setTabValue = (value: string) => {
    dispatch(onChangeTabValue(value))
  }

  const setCardsCount = (value: Array<number>) => {
    dispatch(onChangeCardsCount(value))
  }

  const setSearchTerm = (value: string) => {
    dispatch(onChangeSearchTerm(value))
  }

  return { searchTerm, cardsCount, tabValue, setSearchTerm, setCardsCount, setTabValue }
}
