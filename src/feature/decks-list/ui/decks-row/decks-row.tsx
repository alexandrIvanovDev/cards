import { useState } from 'react'

import { clsx } from 'clsx'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

import s from './decks-row.module.scss'

import { routePaths } from '@/app/providers/router'
import { DeleteIcon } from '@/assets/icons/Delete.tsx'
import { EditIcon } from '@/assets/icons/Edit.tsx'
import { PlayIcon } from '@/assets/icons/Play.tsx'
import { DeckForm } from '@/components/forms/deck-form'
import { Cover } from '@/components/ui/cover'
import { Modal } from '@/components/ui/modal'
import { Skeleton } from '@/components/ui/skeleton'
import { Table } from '@/components/ui/table'
import { Typography } from '@/components/ui/typography'
import { Deck, DeckArgs } from '@/feature/decks-list/services'
import {
  useDeleteDeckMutation,
  useGetDecksQuery,
  useUpdateDeckMutation,
} from '@/feature/decks-list/services/deck.service.ts'
import { DeleteEntityModal } from '@/feature/decks-list/ui/delete-entity-modal/delete-entity-modal.tsx'

type Props = {
  deck: Deck
  userId: string
  isFetching: boolean
}

export const DecksRow = ({ deck, userId, isFetching }: Props) => {
  const isMyDeck = userId === deck.userId

  const { t } = useTranslation()

  const [deleteDeck, { isLoading: deleteDeckIsLoading }] = useDeleteDeckMutation()
  const [updateDeck] = useUpdateDeckMutation()

  const { isLoading } = useGetDecksQuery()

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
    cover: deck?.cover ?? '',
  }

  const disabledPlayIcon = deck.cardsCount === 0

  const isLoadingData = isLoading || isFetching

  return (
    <>
      <Table.Row className={s.row}>
        <Table.Cell>
          <Typography as={Link} to={`${routePaths.packs}/${deck.id}`} className={s.nameWrapper}>
            {isLoadingData ? <Skeleton className={s.skeleton} /> : <Cover cover={deck?.cover} />}
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
              <button className={s.buttonWrapper} disabled={deleteDeckIsLoading}>
                <DeleteIcon
                  className={clsx(s.icon, deleteDeckIsLoading && s.disabledIcon)}
                  onClick={() => setDeleteDeckIsOpen(true)}
                />
              </button>
            )}
          </div>
        </Table.Cell>
      </Table.Row>
      <>
        <DeleteEntityModal
          title={t('Delete Deck')}
          open={deleteDeckIsOpen}
          onOpenChange={setDeleteDeckIsOpen}
          text={`${t('deck')} ${deck.name}? ${t('All cards will be deleted')}`}
          btnText={t('Delete Deck')}
          callback={removeDeck}
        />
        <Modal title={t('Edit Deck')} open={updateDeckIsOpen} onOpenChange={setUpdateDeckIsOpen}>
          <DeckForm
            onSubmit={editDeck}
            setIsOpen={setUpdateDeckIsOpen}
            btnText={t('Save Changes')}
            data={formData}
            // disabled={updateDeckIsLoading}
          />
        </Modal>
      </>
    </>
  )
}
