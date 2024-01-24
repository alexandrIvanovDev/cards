import { FC, useState } from 'react'

import { clsx } from 'clsx'
import { Link, useNavigate } from 'react-router-dom'

import s from './decks-row.module.scss'

import { routePaths } from '@/app/providers/router'
import { DeleteIcon } from '@/assets/icons/Delete.tsx'
import { EditIcon } from '@/assets/icons/Edit.tsx'
import { PlayIcon } from '@/assets/icons/Play.tsx'
import { Modal } from '@/components/ui/modal'
import { Table } from '@/components/ui/table'
import { Typography } from '@/components/ui/typography'
import { DeckForm } from '@/feature/decks-list/deck-form/deck-form.tsx'
import { DeleteEntityModal } from '@/feature/decks-list/delete-entity-modal/delete-entity-modal.tsx'
import { DeckArgs, DeckByIdArgs, DecksResponseItems, UpdateDeck } from '@/services/cards.types.ts'

type Props = {
  deck: DecksResponseItems
  userId: string
  deleteDeck: (data: DeckByIdArgs) => void
  updateDeck: (data: UpdateDeck) => void
}

export const DecksRow: FC<Props> = ({ deck, userId, deleteDeck, updateDeck }) => {
  const isMyDeck = userId === deck.userId

  const [deleteDeckIsOpen, setDeleteDeckIsOpen] = useState(false)
  const [updateDeckIsOpen, setUpdateDeckIsOpen] = useState(false)

  const navigate = useNavigate()

  const removeDeck = () => {
    deleteDeck({ id: deck.id })
    setDeleteDeckIsOpen(false)
  }

  const editDeck = (data: DeckArgs) => {
    updateDeck({ id: deck.id, data })
    setUpdateDeckIsOpen(false)
  }

  const formData: DeckArgs = {
    name: deck.name,
    isPrivate: deck.isPrivate,
  }

  const disabledIcon = deck.cardsCount === 0

  return (
    <>
      <Table.Row className={s.row}>
        <Table.Cell className={s.nameCell}>
          <Typography as={Link} to={`${routePaths.packs}/${deck.id}`} className={s.name}>
            {deck?.name}
          </Typography>
        </Table.Cell>
        <Table.Cell className={s.count}>{deck?.cardsCount}</Table.Cell>
        <Table.Cell className={s.updated}>
          {new Date(deck?.updated).toLocaleDateString()}
        </Table.Cell>
        <Table.Cell className={s.author}>{deck?.author?.name}</Table.Cell>
        <Table.Cell className={s.tableIcons}>
          {isMyDeck && <EditIcon className={s.icon} onClick={() => setUpdateDeckIsOpen(true)} />}
          <button className={s.learnButton} disabled={disabledIcon}>
            <PlayIcon
              className={clsx(s.icon, disabledIcon && s.disabledIcon)}
              onClick={() => navigate(`${routePaths.packs}/${deck.id}${routePaths.learn}`)}
            />
          </button>
          {isMyDeck && <DeleteIcon className={s.icon} onClick={() => setDeleteDeckIsOpen(true)} />}
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
