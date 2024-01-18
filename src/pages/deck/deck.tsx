import { useState } from 'react'

import { Link, useParams } from 'react-router-dom'

import s from './deck.module.scss'

import { ArrowBackIcon } from '@/assets/icons/ArrowBack.tsx'
import { Button } from '@/components/ui/button'
import { Loader } from '@/components/ui/loader'
import { ProgressBar } from '@/components/ui/progress-bar'
import { Typography } from '@/components/ui/typography'
import { useMeQuery } from '@/feature/auth/auth.service.ts'
import { CreateCardFormType } from '@/pages/deck/card-form/use-create-card.tsx'
import { CardModal } from '@/pages/deck/card-modal/cardModal.tsx'
import { DeckTable } from '@/pages/deck/deck-table/deck-table.tsx'
import { DeckTitle } from '@/pages/deck/deck-title/deck-title.tsx'
import {
  useCreateCardMutation,
  useDeleteCardMutation,
  useGetCardsQuery,
  useUpdateCardMutation,
} from '@/services/cards.service.ts'
import { DecksResponseItems, GetCardsResponse } from '@/services/cards.types.ts'
import { useGetDeckByIdQuery } from '@/services/deck.service.ts'

export const Deck = () => {
  const { id } = useParams()
  const { data: deckData, isLoading } = useGetDeckByIdQuery({ id: id as string })
  const { data: cardsData } = useGetCardsQuery({ id: id as string })
  const { data: userData } = useMeQuery()
  const [createCard, { isLoading: createCardIsLoading }] = useCreateCardMutation()
  const [deleteCard, { isLoading: deleteCardIsLoading }] = useDeleteCardMutation()
  const [updateCard, { isLoading: updateCardIsLoading }] = useUpdateCardMutation()

  const [addCardModal, setAddCardModal] = useState(false)

  const isMyDeck = deckData?.userId === userData?.id

  const addNewCard = (createCardData: CreateCardFormType) => {
    createCard({
      deckId: deckData?.id as string,
      data: createCardData,
    })
    setAddCardModal(false)
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className={s.content}>
      {(createCardIsLoading || deleteCardIsLoading || updateCardIsLoading) && <ProgressBar />}
      <Button as={Link} to={'..'} variant="link" className={s.btnBack}>
        <ArrowBackIcon className={s.iconBack} /> <Typography>Back to previous page</Typography>
      </Button>
      <div>
        <DeckTitle
          isMyDeck={isMyDeck}
          cardsData={cardsData as GetCardsResponse}
          openModal={addCardModal}
          setOpenModal={setAddCardModal}
          deckData={deckData as DecksResponseItems}
          addNewCard={addNewCard}
        />
        {cardsData?.items.length ? (
          <>
            <DeckTable
              isMyDeck={isMyDeck}
              cardsData={cardsData}
              deleteCard={deleteCard}
              updateCard={updateCard}
            />
          </>
        ) : (
          <div className={s.notification}>
            {isMyDeck ? (
              <>
                <Typography className={s.text}>
                  This deck is empty. Click add new card to fill this deck
                </Typography>

                <CardModal
                  open={addCardModal}
                  onOpenChange={setAddCardModal}
                  onSubmit={addNewCard}
                  title="Add New Card"
                  trigger={<Button>Add New Card</Button>}
                  buttonText="Add New Card"
                />
              </>
            ) : (
              <Typography as="span" variant="h1" className={s.text}>
                This deck is empty
              </Typography>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
