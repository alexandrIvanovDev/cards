import { useState } from 'react'

import { clsx } from 'clsx'
import { Link, useNavigate } from 'react-router-dom'

import s from './decks-row.module.scss'

import { routePaths } from '@/app/providers/router'
import { DeleteIcon } from '@/assets/icons/Delete.tsx'
import { EditIcon } from '@/assets/icons/Edit.tsx'
import { PlayIcon } from '@/assets/icons/Play.tsx'
import { Cover } from '@/components/ui/cover'
import { Modal } from '@/components/ui/modal'
import { Table } from '@/components/ui/table'
import { Typography } from '@/components/ui/typography'
import { DeckForm } from '@/feature/decks-list/deck-form/deck-form.tsx'
import { DeleteEntityModal } from '@/feature/decks-list/delete-entity-modal/delete-entity-modal.tsx'
import { DeckArgs, DecksResponseItems } from '@/services/cards.types.ts'
import { useDeleteDeckMutation, useUpdateDeckMutation } from '@/services/deck.service.ts'

type Props = {
  deck: DecksResponseItems
  userId: string
}

export const DecksRow = ({ deck, userId }: Props) => {
  const isMyDeck = userId === deck.userId

  const [deleteDeck, { isLoading }] = useDeleteDeckMutation()
  const [updateDeck] = useUpdateDeckMutation()

  const [deleteDeckIsOpen, setDeleteDeckIsOpen] = useState(false)
  const [updateDeckIsOpen, setUpdateDeckIsOpen] = useState(false)

  const navigate = useNavigate()

  const removeDeck = () => {
    deleteDeck({ id: deck.id })
    setDeleteDeckIsOpen(false)
  }

  const editDeck = (data: FormData) => {
    updateDeck({ id: deck.id, data })
    setUpdateDeckIsOpen(false)
  }

  const formData: DeckArgs = {
    name: deck.name,
    isPrivate: deck.isPrivate,
  }

  const disabledPlayIcon = deck.cardsCount === 0

  return (
    <>
      <Table.Row className={s.row}>
        <Table.Cell>
          <Typography as={Link} to={`${routePaths.packs}/${deck.id}`} className={s.nameWrapper}>
            <Cover cover={deck?.cover} />
            <Typography className={s.name} variant={'body2'}>
              {deck?.name}
            </Typography>
          </Typography>
        </Table.Cell>

        <Table.Cell className={s.count}>
          <Typography variant={'body2'}>{deck?.cardsCount}</Typography>
        </Table.Cell>

        <Table.Cell className={s.updated}>
          <Typography variant={'body2'}>{new Date(deck?.updated).toLocaleDateString()}</Typography>
        </Table.Cell>

        <Table.Cell className={s.author}>
          <Typography variant={'body2'}>{deck?.author?.name}</Typography>
        </Table.Cell>

        <Table.Cell className={s.controls}>
          <div className={s.icons}>
            {isMyDeck && <EditIcon className={s.icon} onClick={() => setUpdateDeckIsOpen(true)} />}
            <button className={s.buttonWrapper} disabled={disabledPlayIcon}>
              <PlayIcon
                className={clsx(s.icon, disabledPlayIcon && s.disabledIcon)}
                onClick={() => navigate(`${routePaths.learn}/${deck.id}`)}
              />
            </button>
            {isMyDeck && (
              <button className={s.buttonWrapper} disabled={isLoading}>
                <DeleteIcon
                  className={clsx(s.icon, isLoading && s.disabledIcon)}
                  onClick={() => setDeleteDeckIsOpen(true)}
                />
              </button>
            )}
          </div>
        </Table.Cell>
      </Table.Row>
      <>
        <DeleteEntityModal
          title={'Delete Deck'}
          open={deleteDeckIsOpen}
          onOpenChange={setDeleteDeckIsOpen}
          text={`deck ${deck.name}? All cards will be deleted`}
          btnText={'Delete Deck'}
          callback={removeDeck}
        />
        <Modal title="Edit Deck" open={updateDeckIsOpen} onOpenChange={setUpdateDeckIsOpen}>
          <DeckForm
            onSubmit={editDeck}
            setIsOpen={setUpdateDeckIsOpen}
            btnText={'Save Changes'}
            formData={formData}
            // disabled={updateDeckIsLoading}
          />
        </Modal>
      </>
    </>
  )
}
