import { FC } from 'react'

import s from './deck-table.module.scss'

import { Table } from '@/components/ui/table'
import { TableRow } from '@/pages/deck/table-row/table-row.tsx'
import { DeleteCardsArgs, GetCardsResponse, UpdateCardType } from '@/services/cards.types.ts'

type Props = {
  isMyDeck: boolean
  cardsData: GetCardsResponse
  deleteCard: (data: DeleteCardsArgs) => void
  updateCard: ({ id, data }: UpdateCardType) => void
}

export const DeckTable: FC<Props> = ({ isMyDeck, cardsData, deleteCard, updateCard }) => {
  return (
    <>
      <Table.Root>
        <Table.Head>
          <Table.Row className={s.row}>
            <Table.HeadCell>Question</Table.HeadCell>
            <Table.HeadCell>Answer</Table.HeadCell>
            <Table.HeadCell className={s.updated}>Last Updated</Table.HeadCell>
            <Table.HeadCell className={s.grade}>Grade</Table.HeadCell>
            {isMyDeck && <Table.HeadCell className={s.controls}></Table.HeadCell>}
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {cardsData?.items.map(card => (
            <TableRow
              key={card.id}
              isMyDeck={isMyDeck}
              card={card}
              deleteCard={deleteCard}
              updateCard={updateCard}
            />
          ))}
        </Table.Body>
      </Table.Root>
    </>
  )
}
