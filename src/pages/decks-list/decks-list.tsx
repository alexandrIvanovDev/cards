import { useState } from 'react'

import s from './decks-list.module.scss'

import { ProgressBar } from '@/components/ui/progress-bar/progress-bar.tsx'
import { DecksFilter } from '@/feature/decks-list/decks-filter/decks-filter.tsx'
import { DecksHeader } from '@/feature/decks-list/decks-header/decks-header.tsx'
import { DecksTable } from '@/feature/decks-list/decks-table/decks-table.tsx'
import { useMeQuery } from '@/services/auth/auth.service.ts'
import { GetDecksResponse } from '@/services/cards.types.ts'
import {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
} from '@/services/deck.service.ts'

export const DecksList = () => {
  const { data, isLoading } = useGetDecksQuery()
  const { data: userData } = useMeQuery()
  const [deleteDeck, { isLoading: deleteDeckIsLoading }] = useDeleteDeckMutation()

  const [createDeck, { isLoading: createDeckIsLoading }] = useCreateDeckMutation()

  const [sliderValue, setSlideValue] = useState([2, 10])

  const [addNewPackIsOpen, setAddNewPackIsOpen] = useState(false)

  const [newPackName, setNewPackName] = useState('')

  const onChange = (value: Array<number>) => {
    setSlideValue(value)
  }

  const [tabsValue, setTabsValue] = useState<string>('all')

  const addNewPack = () => {
    createDeck({ name: newPackName })
    setAddNewPackIsOpen(false)
    setNewPackName('')
  }

  return (
    <div className={s.content}>
      {(isLoading || createDeckIsLoading || deleteDeckIsLoading) && <ProgressBar />}
      <DecksHeader
        addNewPackIsOpen={addNewPackIsOpen}
        setAddNewPackIsOpen={setAddNewPackIsOpen}
        addNewPack={addNewPack}
        newPackName={newPackName}
        setNewPackName={setNewPackName}
      />
      <DecksFilter
        tabsValue={tabsValue}
        setTabsValue={setTabsValue}
        sliderValue={sliderValue}
        onChangeSliderValue={onChange}
      />
      <DecksTable
        data={data as GetDecksResponse}
        userId={userData?.id as string}
        deleteDeck={deleteDeck}
      />
    </div>
  )
}
