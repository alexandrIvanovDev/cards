import { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'

import s from './decks-list.module.scss'

import { useDebounce } from '@/common/hooks/use-debounce.ts'
import { getSortedString } from '@/common/utils/getSortedString.ts'
import { Pagination } from '@/components/ui/pagination'
import { ProgressBar } from '@/components/ui/progress-bar/progress-bar.tsx'
import { Sort } from '@/components/ui/table-head/table-head.tsx'
import { Typography } from '@/components/ui/typography'
import { useMeQuery } from '@/feature/auth/auth.service.ts'
import { useDecksFilter } from '@/feature/decks-list/model/hooks/use-decks-filter.ts'
import { usePagination } from '@/feature/decks-list/model/hooks/use-pagination.ts'
import { GetDecks } from '@/feature/decks-list/services'
import {
  useCreateDeckMutation,
  useGetDecksQuery,
} from '@/feature/decks-list/services/deck.service.ts'
import { DecksFilter } from '@/feature/decks-list/ui/decks-filter/decks-filter.tsx'
import { DecksHeader } from '@/feature/decks-list/ui/decks-header/decks-header.tsx'
import { DecksTable } from '@/feature/decks-list/ui/decks-table/decks-table.tsx'

export const DecksList = () => {
  const { data: userData } = useMeQuery()

  const { searchTerm, cardsCount, tabValue, setSearchTerm, setTabValue, setCardsCount } =
    useDecksFilter()
  const { currentPage, pageSize, setCurrentPage, setPageSize } = usePagination()

  const [sort, setSort] = useState<Sort>({ field: 'updated', order: 'desc' })

  const { t } = useTranslation()

  const debouncedValue = useDebounce(searchTerm, 1000)
  const debouncedCardsCount = useDebounce(cardsCount, 1000)

  const {
    data: decksData,
    currentData,
    isLoading: getDecksIsLoading,
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

  const totalPages = data?.pagination.totalPages as number

  const [createDeck, { isLoading: createDeckIsLoading }] = useCreateDeckMutation()

  const isLoading = getDecksIsLoading || createDeckIsLoading || getDecksIsFetching

  const totalCount = data?.pagination.totalItems

  useEffect(() => {
    if (tabValue || (totalCount && totalCount / pageSize < currentPage)) {
      setCurrentPage(1)
    }
  }, [pageSize, tabValue, debouncedValue, debouncedCardsCount])

  return (
    <div className={s.content}>
      {isLoading && <ProgressBar />}
      <DecksHeader createDeck={createDeck} disabled={getDecksIsFetching} />
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
          isFetching={getDecksIsFetching}
        />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={pageSize}
        changePage={setCurrentPage}
        changePageSize={setPageSize}
      />
    </div>
  )
}
