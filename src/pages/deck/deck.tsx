import { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import s from './deck.module.scss'

import { RootState } from '@/app/providers/store/store.ts'
import { useAppDispatch } from '@/common/hooks/use-app-dispatch.ts'
import { useDebounce } from '@/common/hooks/use-debounce.ts'
import { getSortedString } from '@/common/utils/getSortedString.ts'
import { BackButton } from '@/components/ui/back-button'
import { Button } from '@/components/ui/button'
import { Loader } from '@/components/ui/loader'
import { Pagination } from '@/components/ui/pagination'
import { ProgressBar } from '@/components/ui/progress-bar'
import { Sort } from '@/components/ui/table-head'
import { Typography } from '@/components/ui/typography'
import { useMeQuery } from '@/feature/auth/auth.service.ts'
import { CardModal } from '@/feature/deck/ui/card-modal'
import { DeckTable } from '@/feature/deck/ui/deck-table'
import { DeckTitle } from '@/feature/deck/ui/deck-title'
import { SearchCard } from '@/feature/deck/ui/search'
import { Deck as DeckType } from '@/feature/decks-list/services'
import { useGetDeckByIdQuery } from '@/feature/decks-list/services/deck.service.ts'
import {
  useCreateCardMutation,
  useDeleteCardMutation,
  useGetCardsQuery,
  useUpdateCardMutation,
} from '@/services/cards.service.ts'
import { GetCardsResponse } from '@/services/cards.types.ts'
import { setCardsSearchTerm, setCurrentPage, setPageSize } from '@/services/cardsSlice.ts'

export const Deck = () => {
  const { id } = useParams()

  const { t } = useTranslation()

  const search = useSelector((state: RootState) => state.cards.searchTerm)
  const { currentPage, pageSize } = useSelector((state: RootState) => state.cards.pagination)

  const [sort, setSort] = useState<Sort>({ field: 'updated', order: 'desc' })

  const { data: deckData, isLoading: getDeckIsLoading } = useGetDeckByIdQuery({ id: id as string })
  const {
    data: cardsData,
    isLoading: getCardsIsLoading,
    isFetching,
  } = useGetCardsQuery({
    id: id as string,
    question: search,
    currentPage,
    itemsPerPage: pageSize,
    orderBy: getSortedString(sort),
  })
  const { data: userData } = useMeQuery()

  const [createCard, { isLoading: createCardIsLoading }] = useCreateCardMutation()
  const [deleteCard, { isLoading: deleteCardIsLoading }] = useDeleteCardMutation()
  const [updateCard, { isLoading: updateCardIsLoading }] = useUpdateCardMutation()

  const [searchValue, setSearchValue] = useState(search)

  const [addCardModal, setAddCardModal] = useState(false)

  const debouncedValue = useDebounce(searchValue, 1000)

  const dispatch = useAppDispatch()

  const handleSearch = () => {
    dispatch(setCardsSearchTerm(searchValue))
  }

  const isMyDeck = deckData?.userId === userData?.id

  const addNewCard = (createCardData: FormData) => {
    createCard({
      deckId: deckData?.id as string,
      data: createCardData,
    })
    setAddCardModal(false)
  }

  const changePage = (page: number) => {
    dispatch(setCurrentPage(page))
  }

  const changePageSize = (pageSize: number) => {
    dispatch(setPageSize(pageSize))
  }

  const isLoading =
    createCardIsLoading ||
    deleteCardIsLoading ||
    updateCardIsLoading ||
    getCardsIsLoading ||
    isFetching

  useEffect(() => {
    if (debouncedValue || debouncedValue === '') {
      handleSearch()
    }

    return () => {
      dispatch(setCardsSearchTerm(''))
    }
  }, [debouncedValue])

  if (getDeckIsLoading) {
    return <Loader />
  }

  return (
    <div className={s.content}>
      {isLoading && <ProgressBar />}

      <BackButton />

      <div>
        <DeckTitle
          isMyDeck={isMyDeck}
          cardsData={cardsData as GetCardsResponse}
          openModal={addCardModal}
          setOpenModal={setAddCardModal}
          deckData={deckData as DeckType}
          addNewCard={addNewCard}
        />
        <SearchCard value={searchValue} setValue={setSearchValue} />

        {cardsData?.items.length ? (
          <>
            <DeckTable
              isMyDeck={isMyDeck}
              cardsData={cardsData}
              deleteCard={deleteCard}
              updateCard={updateCard}
              sort={sort}
              setSort={setSort}
            />
          </>
        ) : (
          <div className={s.notification}>
            {isMyDeck ? (
              <>
                <Typography className={s.text} variant={'body1'}>
                  {t('This deck is empty. Click add new card to fill this deck')}
                </Typography>

                <CardModal
                  open={addCardModal}
                  onOpenChange={setAddCardModal}
                  onSubmit={addNewCard}
                  title={t('Add New Card')}
                  trigger={
                    <Button>
                      <Typography variant={'subtitle2'} as={'span'}>
                        {t('Add New Card')}
                      </Typography>
                    </Button>
                  }
                  buttonText={t('Add New Card')}
                />
              </>
            ) : (
              <Typography as="span" variant="h1" className={s.text}>
                {t('This deck is empty')}
              </Typography>
            )}
          </div>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        itemsPerPage={pageSize}
        totalPages={cardsData?.pagination.totalPages ?? 1}
        changePage={changePage}
        changePageSize={changePageSize}
      />
    </div>
  )
}
