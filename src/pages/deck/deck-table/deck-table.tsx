import { FC, useState } from 'react'

import s from './deck-table.module.scss'

import { Button } from '@/components/ui/button'
import { Modal, ModalProps } from '@/components/ui/modal'
import { Table } from '@/components/ui/table'
import { TextField } from '@/components/ui/textfield'
import { Typography } from '@/components/ui/typography'
import { TableRow } from '@/pages/deck/table-row/table-row.tsx'
import { DeleteCardsArgs, GetCardsResponse } from '@/services/cards.types.ts'

type Props = {
  isMyDeck: boolean
  cardsData: GetCardsResponse
  deleteCard: (data: DeleteCardsArgs) => void
  // updateCard
}

export const DeckTable: FC<Props> = props => {
  const {
    isMyDeck,
    cardsData,
    // deleteCard,
    // updateCard,
  } = props

  const [deleteCardModal, setDeleteCardModal] = useState(false)

  const [updateCardModal, setUpdateCardModal] = useState(false)

  // const removeCard = (id: string) => {
  //   // deleteCard({ id })
  //   setDeleteCardModal(false)
  // }

  return (
    <>
      <TextField type="search" placeholder="Card search" className={s.searchInput} />
      <Table.Root>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Question</Table.HeadCell>
            <Table.HeadCell>Answer</Table.HeadCell>
            <Table.HeadCell>Last Updated</Table.HeadCell>
            <Table.HeadCell>Grade</Table.HeadCell>
            {isMyDeck && <Table.HeadCell style={{ width: 100 }}></Table.HeadCell>}
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {cardsData?.items.map(card => {
            // const update = (createCardData: CreateCardFormType) => {
            //   updateCard({
            //     deckId: card?.id,
            //     data: createCardData,
            //   })
            //   setUpdateCardModal(false)
            // }
            return (
              <TableRow
                key={card.id}
                isMyDeck={isMyDeck}
                card={card}
                deleteCardModal={deleteCardModal}
                setDeleteCardModal={setDeleteCardModal}
                updateCardModal={updateCardModal}
                setUpdateCardModal={setUpdateCardModal}
              />
            )
          })}
        </Table.Body>
      </Table.Root>
    </>
  )
}

type DeleteEntityProps = ModalProps & {
  text: string
  btnText: string
  callback: () => void
  disabled?: boolean
}

export const DeleteEntityModal: FC<DeleteEntityProps> = props => {
  const { text, btnText, open, onOpenChange, callback, disabled, ...rest } = props

  return (
    <Modal open={open} onOpenChange={onOpenChange} {...rest}>
      <div className={s.deleteCardModal}>
        <Typography>Do you really want to remove {text}</Typography>
        <div className={s.btns}>
          <Button variant="secondary" onClick={() => onOpenChange(!open)}>
            Cancel
          </Button>
          <Button onClick={callback} disabled={disabled}>
            {btnText}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
