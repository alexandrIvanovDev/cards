import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import s from './decks-list.module.scss'

import { AppDispatch, RootState } from '@/app/providers/store/store.ts'
import { useDebounce } from '@/common/hooks/useDebounce.ts'
import { ProgressBar } from '@/components/ui/progress-bar/progress-bar.tsx'
import { Typography } from '@/components/ui/typography'
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
import { setCardsCount, setSearchTerm, setTabValue } from '@/services/decksSlice.ts'

export const DecksList = () => {
  const { data: userData } = useMeQuery()
  const { tabValue, cardsCount, searchTerm } = useSelector((state: RootState) => state.decks.filter)
  const { data, isLoading, isFetching } = useGetDecksQuery(
    {
      authorId: tabValue,
      name: searchTerm,
      minCardsCount: cardsCount[0],
      maxCardsCount: cardsCount[1],
    },
    { refetchOnMountOrArgChange: true }
  )

  const [deleteDeck, { isLoading: deleteDeckIsLoading }] = useDeleteDeckMutation()
  const [updateDeck, { isLoading: updateDeckIsLoading }] = useUpdateDeckMutation()
  const [createDeck, { isLoading: createDeckIsLoading }] = useCreateDeckMutation()

  const dispatch = useDispatch<AppDispatch>()

  const [sliderValue, setSlideValue] = useState(cardsCount)
  const [search, setSearch] = useState(searchTerm)

  const debouncedValue = useDebounce(search, 1000)

  const debouncedCardsCount = useDebounce(sliderValue, 1000)

  const handleSearch = () => {
    dispatch(setSearchTerm(search))
  }

  const handleCardsCount = () => {
    dispatch(setCardsCount(sliderValue))
  }

  const [addNewPackIsOpen, setAddNewPackIsOpen] = useState(false)

  const [tabsValue, setTabsValue] = useState<string>(tabValue)

  const onTabValueChange = (value: string) => {
    setTabsValue(value)
    dispatch(setTabValue(value))
  }

  const clearFilter = () => {
    dispatch(setSearchTerm(''))
    dispatch(setCardsCount([0, data?.maxCardsCount ?? 10]))
    setSearch('')
    onTabValueChange('')
    setSlideValue([0, data?.maxCardsCount ?? 10])
  }

  useEffect(() => {
    if (debouncedValue || debouncedValue === '') {
      handleSearch()
    }
    if (debouncedCardsCount) {
      handleCardsCount()
    }
  }, [debouncedValue, debouncedCardsCount])

  return (
    <div className={s.content}>
      {(isLoading ||
        createDeckIsLoading ||
        deleteDeckIsLoading ||
        updateDeckIsLoading ||
        isFetching) && <ProgressBar />}
      <DecksHeader
        isOpen={addNewPackIsOpen}
        setIsOpen={setAddNewPackIsOpen}
        createDeck={createDeck}
      />
      <DecksFilter
        userId={userData?.id ?? ''}
        tabsValue={tabsValue}
        setTabsValue={onTabValueChange}
        sliderValue={sliderValue}
        onChangeSliderValue={setSlideValue}
        maxCardsCount={data?.maxCardsCount as number}
        search={search}
        setSearch={setSearch}
        clearFilter={clearFilter}
      />
      {!data?.items.length ? (
        <Typography className={s.noDataMessage} variant={'h2'} as={'h2'}>
          No data with this filter
        </Typography>
      ) : (
        <DecksTable
          data={data as GetDecksResponse}
          userId={userData?.id as string}
          deleteDeck={deleteDeck}
          updateDeck={updateDeck}
        />
      )}
    </div>
  )
}
