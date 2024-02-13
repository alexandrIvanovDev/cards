import { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'

import s from './deck.module.scss'

import { useDebounce } from '@/common/hooks/use-debounce.ts'
import { getSortedString } from '@/common/utils/getSortedString.ts'
import { BackButton } from '@/components/ui/back-button'
import { Button } from '@/components/ui/button'
import { Loader } from '@/components/ui/loader'
import { Pagination } from '@/components/ui/pagination'
import { Sort } from '@/components/ui/table-head'
import { Typography } from '@/components/ui/typography'
import { useMeQuery } from '@/feature/auth/serivices'
import { useDeck } from '@/feature/deck/model/hooks'
import { useCreateCardMutation, useGetCardsQuery } from '@/feature/deck/services'
import { GetCards } from '@/feature/deck/services/deck.types.ts'
import { CardModal } from '@/feature/deck/ui/card-modal'
import { DeckTable } from '@/feature/deck/ui/deck-table'
import { DeckTitle } from '@/feature/deck/ui/deck-title'
import { SearchCard } from '@/feature/deck/ui/search'
import { Deck as DeckType, useGetDeckByIdQuery } from '@/feature/decks-list/services'

export const Deck = () => {
  const {
    currentPage,
    pageSize,
    searchTerm,
    deckId,
    setCurrentPage,
    setPageSize,
    setSearchTerm,
    setDefaultState,
  } = useDeck()

  const { t } = useTranslation()

  const [sort, setSort] = useState<Sort>({ field: 'updated', order: 'desc' })

  const debouncedValue = useDebounce(searchTerm, 1000)

  const { data: deckData, isLoading: getDeckIsLoading } = useGetDeckByIdQuery({ id: deckId })

  const { data: cardsData } = useGetCardsQuery({
    id: deckId,
    question: debouncedValue,
    currentPage,
    itemsPerPage: pageSize,
    orderBy: getSortedString(sort),
  })
  const { data: userData } = useMeQuery()

  const [createCard] = useCreateCardMutation()

  const [addCardModal, setAddCardModal] = useState(false)

  const isMyDeck = deckData?.userId === userData?.id

  const addNewCard = (createCardData: FormData) => {
    createCard({
      deckId: deckData?.id as string,
      data: createCardData,
    })
    setAddCardModal(false)
  }

  const totalItems = cardsData?.pagination.totalItems ?? 5
  const totalPages = cardsData?.pagination.totalPages ?? 1

  useEffect(() => {
    window.scroll(0, 150)
  }, [currentPage])

  useEffect(() => {
    setDefaultState()

    const condition = totalItems && totalItems / pageSize < currentPage

    if (condition || condition === undefined) {
      setCurrentPage(1)
    }
  }, [pageSize])

  if (getDeckIsLoading) {
    return <Loader />
  }

  return (
    <div className={s.content}>
      <BackButton />

      <div>
        <DeckTitle
          isMyDeck={isMyDeck}
          cardsData={cardsData as GetCards}
          openModal={addCardModal}
          setOpenModal={setAddCardModal}
          deckData={deckData as DeckType}
          addNewCard={addNewCard}
        />
        <SearchCard value={searchTerm} setValue={setSearchTerm} />

        {cardsData?.items.length ? (
          <>
            <DeckTable isMyDeck={isMyDeck} cardsData={cardsData} sort={sort} setSort={setSort} />
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
                  buttonText={t('Add New Card')}
                />
                <Button onClick={() => setAddCardModal(true)}>
                  <Typography variant={'subtitle2'} as={'span'}>
                    {t('Add New Card')}
                  </Typography>
                </Button>
              </>
            ) : (
              <Typography as="span" variant="h1" className={s.text}>
                {t('No data available')}
              </Typography>
            )}
          </div>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        itemsPerPage={pageSize}
        totalPages={totalPages}
        totalCount={totalItems}
        changePage={setCurrentPage}
        changePageSize={setPageSize}
      />
    </div>
  )
}
