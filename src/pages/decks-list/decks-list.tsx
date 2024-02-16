import { useState } from 'react'

import { useTranslation } from 'react-i18next'

import s from './decks-list.module.scss'

import { useDebounce } from '@/common/hooks/use-debounce.ts'
import { getSortedString } from '@/common/utils/getSortedString.ts'
import { Loader } from '@/components/ui/loader'
import { Pagination } from '@/components/ui/pagination'
import { Sort } from '@/components/ui/table-head/table-head.tsx'
import { Typography } from '@/components/ui/typography'
import { useMeQuery } from '@/feature/auth/serivices'
import { useDecksFilter, useDecksPagination } from '@/feature/decks-list/model/hooks'
import { GetDecks, useGetDecksQuery } from '@/feature/decks-list/services'
import { DecksFilter } from '@/feature/decks-list/ui/decks-filter/decks-filter.tsx'
import { DecksHeader } from '@/feature/decks-list/ui/decks-header/decks-header.tsx'
import { DecksTable } from '@/feature/decks-list/ui/decks-table/decks-table.tsx'

export const DecksList = () => {
  const { data: userData } = useMeQuery()

  const { searchTerm, cardsCount, tabValue, setSearchTerm, setTabValue, setCardsCount } =
    useDecksFilter()
  const { currentPage, pageSize, setCurrentPage, setPageSize } = useDecksPagination()

  const [sort, setSort] = useState<Sort>({ field: 'updated', order: 'desc' })

  const { t } = useTranslation()

  const debouncedValue = useDebounce(searchTerm, 1000)
  const debouncedCardsCount = useDebounce(cardsCount, 1000)

  const {
    data: decksData,
    currentData,
    isLoading,
    isFetching: getDecksIsFetching,
  } = useGetDecksQuery({
    authorId: tabValue,
    name: debouncedValue,
    minCardsCount: debouncedCardsCount[0],
    maxCardsCount: debouncedCardsCount[1],
    itemsPerPage: pageSize,
    currentPage: currentPage,
    orderBy: getSortedString(sort),
  })

  const data = currentData ?? decksData

  const handleScroll = () => {
    window.scroll(0, 150)
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <main className={s.content}>
      <DecksHeader disabled={getDecksIsFetching} />
      <DecksFilter
        userId={userData?.id ?? ''}
        tabsValue={tabValue}
        setTabValue={setTabValue}
        sliderValue={cardsCount}
        setCardsCount={setCardsCount}
        maxCardsCount={data?.maxCardsCount as number}
        search={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      {!data?.items.length ? (
        <Typography className={s.noDataMessage} variant={'h2'} as={'h2'}>
          {t('No data available')}
        </Typography>
      ) : (
        <DecksTable
          data={data as GetDecks}
          userId={userData?.id as string}
          sort={sort}
          setSort={setSort}
          getDecksIsFetching={getDecksIsFetching}
          getDecksIsLoading={isLoading}
        />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={data?.pagination.totalPages as number}
        itemsPerPage={pageSize}
        totalCount={data?.pagination.totalItems as number}
        changePage={setCurrentPage}
        changePageSize={setPageSize}
        handleScroll={handleScroll}
      />
    </main>
  )
}
