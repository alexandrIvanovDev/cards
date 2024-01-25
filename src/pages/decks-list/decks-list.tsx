import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import s from './decks-list.module.scss'

import { AppDispatch, RootState } from '@/app/providers/store/store.ts'
import { useDebounce } from '@/common/hooks/useDebounce.ts'
import { getSortedString } from '@/common/utils/getSortedString.ts'
import { Pagination } from '@/components/ui/pagination'
import { ProgressBar } from '@/components/ui/progress-bar/progress-bar.tsx'
import { Sort } from '@/components/ui/table-head/table-head.tsx'
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
import {
  setCardsCount,
  setCurrentPage,
  setPageSize,
  setSearchTerm,
  setTabValue,
} from '@/services/decksSlice.ts'

export const DecksList = () => {
  const { data: userData } = useMeQuery()
  const { tabValue, cardsCount, searchTerm } = useSelector((state: RootState) => state.decks.filter)
  const { currentPage, pageSize } = useSelector((state: RootState) => state.decks.pagination)

  const [sort, setSort] = useState<Sort>({ field: 'updated', order: 'desc' })

  const {
    data: decksData,
    currentData,
    isLoading: getDecksIsLoading,
    isFetching,
  } = useGetDecksQuery({
    authorId: tabValue,
    name: searchTerm,
    minCardsCount: cardsCount[0],
    maxCardsCount: cardsCount[1],
    itemsPerPage: pageSize,
    currentPage: currentPage,
    orderBy: getSortedString(sort),
  })

  const data = currentData ?? decksData

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

  const changePageSize = (pageSize: number) => {
    dispatch(setPageSize(pageSize))
  }

  const changePage = (page: number) => {
    dispatch(setCurrentPage(page))
  }

  const isLoading =
    getDecksIsLoading ||
    createDeckIsLoading ||
    deleteDeckIsLoading ||
    updateDeckIsLoading ||
    isFetching

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
      {isLoading && <ProgressBar />}
      <DecksHeader
        isOpen={addNewPackIsOpen}
        setIsOpen={setAddNewPackIsOpen}
        createDeck={createDeck}
        isFetching={isFetching}
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
          No data available
        </Typography>
      ) : (
        <DecksTable
          data={data as GetDecksResponse}
          userId={userData?.id as string}
          deleteDeck={deleteDeck}
          updateDeck={updateDeck}
          sort={sort}
          setSort={setSort}
        />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={data?.pagination.totalPages ?? 10}
        itemsPerPage={pageSize}
        changePage={changePage}
        changePageSize={changePageSize}
      />
    </div>
  )
}
