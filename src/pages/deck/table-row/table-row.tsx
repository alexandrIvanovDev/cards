import { FC } from 'react'

import s from './table-row.module.scss'

import { DeleteIcon } from '@/assets/icons/Delete.tsx'
import { EditIcon } from '@/assets/icons/Edit.tsx'
import { Table } from '@/components/ui/table'
import { CardModal } from '@/pages/deck/card-modal/cardModal.tsx'
import { DeleteEntityModal } from '@/pages/deck/deck-table/deck-table.tsx'
import { CardsResponseItems } from '@/services/cards.types.ts'

type Props = {
  isMyDeck: boolean
  card: CardsResponseItems
  deleteCardModal: boolean
  setDeleteCardModal: (value: boolean) => void
  updateCardModal: boolean
  setUpdateCardModal: (value: boolean) => void
}

export const TableRow: FC<Props> = props => {
  const {
    card,
    isMyDeck,
    setDeleteCardModal,
    deleteCardModal,
    setUpdateCardModal,
    updateCardModal,
  } = props

  return (
    <>
      <>
        <DeleteEntityModal
          title="Delete Card"
          open={deleteCardModal}
          onOpenChange={setDeleteCardModal}
          text="this card"
          btnText="Delete card"
          callback={() => {}}
        />
        <CardModal
          title="Edit Card"
          open={updateCardModal}
          onOpenChange={setUpdateCardModal}
          // onSubmit={update}
          onSubmit={() => {}}
          question={card.question}
          answer={card.answer}
          buttonText="Save Changes"
        />
      </>
      <Table.Row key={card.id}>
        <Table.Cell>{card.question}</Table.Cell>
        <Table.Cell>{card.answer}</Table.Cell>
        <Table.Cell>{new Date(card?.updated as string).toLocaleDateString()}</Table.Cell>
        <Table.Cell>{card.shots}</Table.Cell>

        {isMyDeck && (
          <Table.Cell className={s.iconWrapper}>
            <EditIcon onClick={() => setUpdateCardModal(true)} className={s.icon} />
            <DeleteIcon onClick={() => setDeleteCardModal(true)} className={s.icon} />
          </Table.Cell>
        )}
      </Table.Row>
    </>
  )
}
