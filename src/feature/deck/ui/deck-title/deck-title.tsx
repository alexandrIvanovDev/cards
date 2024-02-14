import { useState } from 'react'

import { clsx } from 'clsx'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

import s from './deck-title.module.scss'

import { routePaths } from '@/app/providers/router'
import { DeleteIcon } from '@/assets/icons/Delete.tsx'
import { EditIcon } from '@/assets/icons/Edit.tsx'
import { PlayIcon } from '@/assets/icons/Play.tsx'
import { notificationHandler } from '@/common/utils/notification-handler.ts'
import { DeckForm } from '@/components/forms/deck-form'
import { Button } from '@/components/ui/button'
import { Dropdown, DropDownItemWithIcon } from '@/components/ui/dropdown'
import { Modal } from '@/components/ui/modal'
import { Typography } from '@/components/ui/typography'
import { GetCards } from '@/feature/deck/services/deck.types.ts'
import { CardModal } from '@/feature/deck/ui/card-modal/card-modal.tsx'
import { Deck, DeckArgs } from '@/feature/decks-list/services'
import {
  useDeleteDeckMutation,
  useUpdateDeckMutation,
} from '@/feature/decks-list/services/decks-list.service.ts'
import { DeleteEntityModal } from '@/feature/decks-list/ui/delete-entity-modal/delete-entity-modal.tsx'

type Props = {
  isMyDeck: boolean
  cardsData: GetCards
  deckData: Deck
  openModal: boolean
  setOpenModal: (value: boolean) => void
  addNewCard: (createCardData: FormData) => void
}

export const DeckTitle = (props: Props) => {
  const { cardsData, isMyDeck, deckData, openModal, setOpenModal, addNewCard } = props

  const { t } = useTranslation()

  const [deleteDeckIsOpen, setDeleteDeckIsOpen] = useState(false)
  const [updateDeckIsOpen, setUpdateDeckIsOpen] = useState(false)

  const [openDropDown, setOpenDropDown] = useState(false)

  const navigate = useNavigate()

  const [deleteDeck, { isLoading }] = useDeleteDeckMutation()
  const [updateDeck, { isLoading: updateDeckIsLoading }] = useUpdateDeckMutation()

  const removeDeck = async () => {
    try {
      await deleteDeck({ id: deckData.id }).unwrap()

      navigate(routePaths.packs)
    } catch (e) {
      notificationHandler(e)
    }
  }

  const editDeck = async (data: FormData) => {
    try {
      await updateDeck({ id: deckData.id, data }).unwrap()
      setUpdateDeckIsOpen(false)
    } catch (e) {
      notificationHandler(e)
    }
  }

  const formData: DeckArgs = {
    name: deckData?.name ?? '',
    isPrivate: deckData?.isPrivate ?? false,
    cover: deckData?.cover ?? '',
  }

  return (
    <>
      <div className={s.titleWrapper}>
        <div className={s.title}>
          <Typography as="h2" variant="large">
            {deckData?.name ?? ''}
          </Typography>
          {isMyDeck && (
            <Dropdown open={openDropDown} setOpen={setOpenDropDown}>
              <div>
                <DropDownItemWithIcon
                  icon={<PlayIcon />}
                  text={t('Learn')}
                  disabled={deckData.cardsCount === 0}
                  onSelect={() => navigate(`${routePaths.learn}/${deckData.id}`)}
                />
                <DropDownItemWithIcon
                  icon={<EditIcon />}
                  text={t('Edit')}
                  onSelect={() => setUpdateDeckIsOpen(true)}
                />
                <DropDownItemWithIcon
                  icon={<DeleteIcon />}
                  text={t('Delete')}
                  onSelect={() => setDeleteDeckIsOpen(true)}
                />
              </div>
            </Dropdown>
          )}
        </div>
        {isMyDeck && deckData?.cardsCount > 0 ? (
          <>
            <CardModal
              open={openModal}
              onOpenChange={setOpenModal}
              onSubmit={addNewCard}
              className={clsx(!cardsData?.items.length && s.hidden)}
              title={t('Add New Card')}
              buttonText={t('Add New Card')}
            />
            <Button onClick={() => setOpenModal(true)}>
              <Typography variant={'subtitle2'} as={'span'}>
                {t('Add New Card')}
              </Typography>
            </Button>
          </>
        ) : (
          deckData?.cardsCount > 0 && (
            <Button
              as={Link}
              to={`${routePaths.learn}/${deckData.id}`}
              onClick={() => navigate(`${routePaths.learn}/${deckData.id}`)}
            >
              <Typography variant={'subtitle2'}>{t('Learn Deck')}</Typography>
            </Button>
          )
        )}
      </div>

      {deckData?.cover && <img src={deckData.cover} alt="cover" className={s.cover} />}

      <>
        <DeleteEntityModal
          title={t('Delete Deck')}
          open={deleteDeckIsOpen}
          onOpenChange={setDeleteDeckIsOpen}
          text={`${t('deck')} ${formData.name}? ${t('All cards will be deleted')}.`}
          btnText={t('Delete Deck')}
          callback={removeDeck}
          disabled={isLoading}
        />
        <Modal title={t('Edit Deck')} open={updateDeckIsOpen} onOpenChange={setUpdateDeckIsOpen}>
          <DeckForm
            onSubmit={editDeck}
            setIsOpen={setUpdateDeckIsOpen}
            btnText={t('Save Changes')}
            data={formData}
            disabled={updateDeckIsLoading}
          />
        </Modal>
      </>
    </>
  )
}
