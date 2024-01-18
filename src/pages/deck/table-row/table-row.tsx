import { FC, useState } from 'react'

import s from './table-row.module.scss'

import { DeleteIcon } from '@/assets/icons/Delete.tsx'
import { EditIcon } from '@/assets/icons/Edit.tsx'
import { Table } from '@/components/ui/table'
import { DeleteEntityModal } from '@/feature/decks-list/delete-entity-modal/delete-entity-modal.tsx'
import { CardModal } from '@/pages/deck/card-modal/cardModal.tsx'
import {
  CardsResponseItems,
  CreateCardsArgs,
  DeleteCardsArgs,
  UpdateCardType,
} from '@/services/cards.types.ts'

type Props = {
  isMyDeck: boolean
  card: CardsResponseItems
  deleteCard: (data: DeleteCardsArgs) => void
  updateCard: ({ id, data }: UpdateCardType) => void
}

export const TableRow: FC<Props> = props => {
  const { card, isMyDeck, deleteCard, updateCard } = props

  const [deleteCardIsOpen, setDeleteCardIsOpen] = useState(false)
  const [updateCardIsOpen, setUpdateCardIsOpen] = useState(false)

  const editCard = (data: CreateCardsArgs) => {
    console.log(card.id)
    updateCard({ id: card.id, data })
    setUpdateCardIsOpen(false)
  }

  return (
    <>
      <Table.Row key={card.id}>
        <Table.Cell>{card.question}</Table.Cell>
        <Table.Cell>{card.answer}</Table.Cell>
        <Table.Cell>{new Date(card?.updated as string).toLocaleDateString()}</Table.Cell>
        <Table.Cell>{card.shots}</Table.Cell>

        {isMyDeck && (
          <Table.Cell className={s.iconWrapper}>
            <EditIcon onClick={() => setUpdateCardIsOpen(true)} className={s.icon} />
            <DeleteIcon onClick={() => setDeleteCardIsOpen(true)} className={s.icon} />
          </Table.Cell>
        )}
      </Table.Row>
      <>
        <DeleteEntityModal
          title="Delete Card"
          open={deleteCardIsOpen}
          onOpenChange={setDeleteCardIsOpen}
          text={'this card'}
          btnText="Delete Card"
          callback={() => deleteCard({ id: card.id })}
        />
        <CardModal
          title="Edit Card"
          open={updateCardIsOpen}
          onOpenChange={setUpdateCardIsOpen}
          onSubmit={editCard}
          question={card.question}
          answer={card.answer}
          buttonText="Save Changes"
        />
      </>
    </>
  )
}
