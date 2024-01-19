import { useState } from 'react'

import { useSelector } from 'react-redux'

import s from './decks-list.module.scss'

import { RootState } from '@/app/providers/store/store.ts'
import { ProgressBar } from '@/components/ui/progress-bar/progress-bar.tsx'
import { useMeQuery } from '@/feature/auth/auth.service.ts'
import { DecksFilter } from '@/feature/decks-list/decks-filter/decks-filter.tsx'
import { DecksHeader } from '@/feature/decks-list/decks-header/decks-header.tsx'
import { DecksTable } from '@/feature/decks-list/decks-table/decks-table.tsx'
import { GetDecksResponse } from '@/services/cards.types.ts'
import {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useUpdateDeckMutation,
} from '@/services/deck.service.ts'

export const DecksList = () => {
  const { data, isLoading } = useGetDecksQuery()
  const { data: userData } = useMeQuery()
  const { tabValue, cardsCount } = useSelector((state: RootState) => state.decks.filter)

  const [deleteDeck, { isLoading: deleteDeckIsLoading }] = useDeleteDeckMutation()
  const [updateDeck, { isLoading: updateDeckIsLoading }] = useUpdateDeckMutation()
  const [createDeck, { isLoading: createDeckIsLoading }] = useCreateDeckMutation()

  const [sliderValue, setSlideValue] = useState(cardsCount)

  const [addNewPackIsOpen, setAddNewPackIsOpen] = useState(false)

  const onChange = (value: Array<number>) => {
    setSlideValue(value)
  }

  const [tabsValue, setTabsValue] = useState<string>(tabValue)

  // const [search, setSearch] = useState(searchTerm)

  return (
    <div className={s.content}>
      {(isLoading || createDeckIsLoading || deleteDeckIsLoading || updateDeckIsLoading) && (
        <ProgressBar />
      )}
      <DecksHeader
        isOpen={addNewPackIsOpen}
        setIsOpen={setAddNewPackIsOpen}
        createDeck={createDeck}
      />
      <DecksFilter
        tabsValue={tabsValue}
        setTabsValue={setTabsValue}
        sliderValue={sliderValue}
        onChangeSliderValue={onChange}
        maxCardsCount={data?.maxCardsCount as number}
      />
      <DecksTable
        data={data as GetDecksResponse}
        userId={userData?.id as string}
        deleteDeck={deleteDeck}
        updateDeck={updateDeck}
      />
    </div>
  )
}
