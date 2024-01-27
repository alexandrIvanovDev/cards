import { useState } from 'react'

import { clsx } from 'clsx'
import { useNavigate } from 'react-router-dom'

import s from './deck-title.module.scss'

import { routePaths } from '@/app/providers/router'
import { DeleteIcon } from '@/assets/icons/Delete.tsx'
import { EditIcon } from '@/assets/icons/Edit.tsx'
import { PlayIcon } from '@/assets/icons/Play.tsx'
import { Button } from '@/components/ui/button'
import { Dropdown, DropDownItemWithIcon } from '@/components/ui/dropdown'
import { Modal } from '@/components/ui/modal'
import { ProgressBar } from '@/components/ui/progress-bar'
import { Typography } from '@/components/ui/typography'
import { DeckForm } from '@/feature/decks-list/deck-form/deck-form.tsx'
import { DeleteEntityModal } from '@/feature/decks-list/delete-entity-modal/delete-entity-modal.tsx'
import { CreateCardFormType } from '@/pages/deck/card-form/use-create-card.tsx'
import { CardModal } from '@/pages/deck/card-modal/cardModal.tsx'
import { DeckArgs, DecksResponseItems, GetCardsResponse } from '@/services/cards.types.ts'
import { useDeleteDeckMutation, useUpdateDeckMutation } from '@/services/deck.service.ts'

type Props = {
  isMyDeck: boolean
  cardsData: GetCardsResponse
  deckData: DecksResponseItems
  openModal: boolean
  setOpenModal: (value: boolean) => void
  addNewCard: (createCardData: CreateCardFormType) => void
}

export const DeckTitle = (props: Props) => {
  const { cardsData, isMyDeck, deckData, openModal, setOpenModal, addNewCard } = props

  const classes = {
    addCard: clsx(!cardsData?.items.length && s.hidden),
  }

  const [deleteDeckIsOpen, setDeleteDeckIsOpen] = useState(false)
  const [updateDeckIsOpen, setUpdateDeckIsOpen] = useState(false)

  const navigate = useNavigate()

  const [deleteDeck, { isLoading }] = useDeleteDeckMutation()
  const [updateDeck, { isLoading: updateDeckIsLoading }] = useUpdateDeckMutation()

  const removeDeck = async () => {
    try {
      await deleteDeck({ id: deckData.id })

      navigate(routePaths.packs)
    } catch (e) {
      console.error(e)
    }
  }

  const editDeck = async (data: DeckArgs) => {
    try {
      await updateDeck({ id: deckData.id, data })
      setUpdateDeckIsOpen(false)
    } catch (e) {
      console.error(e)
    }
  }

  const formData: DeckArgs = {
    name: deckData?.name ?? '',
    isPrivate: deckData?.isPrivate ?? false,
  }

  return (
    <>
      <div className={s.titleWrapper}>
        {(isLoading || updateDeckIsLoading) && <ProgressBar />}
        <div className={s.title}>
          <Typography as="h2" variant="large">
            {deckData?.name ?? ''}
          </Typography>
          {isMyDeck && (
            <Dropdown>
              <div>
                <DropDownItemWithIcon
                  icon={<PlayIcon />}
                  text={'Learn'}
                  disabled={deckData.cardsCount === 0}
                  onSelect={() => navigate(`${routePaths.learn}/${deckData.id}`)}
                />
                <DropDownItemWithIcon
                  icon={<EditIcon />}
                  text={'Edit'}
                  onSelect={() => setUpdateDeckIsOpen(true)}
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
            trigger={
              <Button>
                <Typography variant={'subtitle2'} as={'span'}>
                  Add New Card
                </Typography>
              </Button>
            }
            title="Add New Card"
            buttonText="Add New Card"
          />
        ) : (
          <Button
            disabled={deckData?.cardsCount === 0}
            onClick={() => navigate(`${routePaths.learn}/${deckData.id}`)}
          >
            Learn Deck
          </Button>
        )}
      </div>

      {deckData.cover && <img src={deckData.cover} alt="cover" className={s.cover} />}

      <>
        <DeleteEntityModal
          title="Delete Deck"
          open={deleteDeckIsOpen}
          onOpenChange={setDeleteDeckIsOpen}
          text={`deck ${deckData.name}? All cards will be deleted.`}
          btnText="Delete Deck"
          callback={removeDeck}
          disabled={isLoading}
        />
        <Modal title="Edit pack" open={updateDeckIsOpen} onOpenChange={setUpdateDeckIsOpen}>
          <DeckForm
            onSubmit={editDeck}
            setIsOpen={setUpdateDeckIsOpen}
            btnText={'Save Changes'}
            formData={formData}
            disabled={updateDeckIsLoading}
          />
        </Modal>
      </>
    </>
  )
}
