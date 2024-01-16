import { FC, useState } from 'react'

import { clsx } from 'clsx'
import { useNavigate } from 'react-router-dom'

import s from './deck-title.module.scss'

import { routePaths } from '@/app/providers/router'
import { DeleteIcon } from '@/assets/icons/Delete.tsx'
import { EditIcon } from '@/assets/icons/Edit.tsx'
import { PlayIcon } from '@/assets/icons/Play.tsx'
import { Button } from '@/components/ui/button'
import { Dropdown, DropDownItemWithIcon } from '@/components/ui/dropdown'
import { ProgressBar } from '@/components/ui/progress-bar'
import { Typography } from '@/components/ui/typography'
import { CreateCardFormType } from '@/pages/deck/card-form/use-create-card.tsx'
import { CardModal } from '@/pages/deck/card-modal/cardModal.tsx'
import { DeleteEntityModal } from '@/pages/deck/deck-table/deck-table.tsx'
import { DecksResponseItems, GetCardsResponse } from '@/services/cards.types.ts'
import { useDeleteDeckMutation } from '@/services/deck.service.ts'

type Props = {
  isMyDeck: boolean
  cardsData: GetCardsResponse
  deckData: DecksResponseItems
  openModal: boolean
  setOpenModal: (value: boolean) => void
  addNewCard: (createCardData: CreateCardFormType) => void
}

export const DeckTitle: FC<Props> = props => {
  const { cardsData, isMyDeck, deckData, openModal, setOpenModal, addNewCard } = props

  const classes = {
    addCard: clsx(!cardsData?.items.length && s.hidden),
  }

  const [deleteDeckIsOpen, setDeleteDeckIsOpen] = useState(false)
  // const [updateDeckIsOpen, setUpdateDeckIsOpen] = useState(false)

  const navigate = useNavigate()

  const [deleteDeck, { isLoading }] = useDeleteDeckMutation()

  const removeDeck = async () => {
    await deleteDeck({ id: deckData.id })
    navigate(routePaths.packs)
  }

  return (
    <div className={s.titleWrapper}>
      {isLoading && <ProgressBar />}
      <div className={s.title}>
        <Typography as="h2" variant="large">
          {deckData?.name}
        </Typography>
        {isMyDeck && (
          <Dropdown>
            <div>
              <DropDownItemWithIcon icon={<PlayIcon />} text={'Learn'} />
              <DropDownItemWithIcon
                icon={<EditIcon />}
                text={'Edit'}
                // onSelect={() => setUpdateDeckIsOpen(true)}
              />
              <DropDownItemWithIcon
                icon={<DeleteIcon />}
                text={'Delete'}
                onSelect={() => setDeleteDeckIsOpen(true)}
              />
            </div>
          </Dropdown>
        )}
      </div>
      {isMyDeck ? (
        <CardModal
          open={openModal}
          onOpenChange={setOpenModal}
          onSubmit={addNewCard}
          className={classes.addCard}
          trigger={<Button>Add New Card</Button>}
          title="Add New Card"
          buttonText="Add New Card"
        />
      ) : (
        <Button disabled={cardsData?.items.length === 0}>Learn Deck</Button>
      )}

      {/*Modal*/}
      <>
        <DeleteEntityModal
          title="Delete Card"
          open={deleteDeckIsOpen}
          onOpenChange={setDeleteDeckIsOpen}
          text={`deck ${deckData.name}? All cards will be deleted.`}
          btnText="Delete Deck"
          callback={removeDeck}
          disabled={isLoading}
        />
      </>
    </div>
  )
}
