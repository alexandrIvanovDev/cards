import { FC } from 'react'

import { Table } from '@/components/ui/table'
import { TableRow } from '@/pages/deck/table-row/table-row.tsx'
import { DeleteCardsArgs, GetCardsResponse, UpdateCardType } from '@/services/cards.types.ts'

type Props = {
  isMyDeck: boolean
  cardsData: GetCardsResponse
  deleteCard: (data: DeleteCardsArgs) => void
  updateCard: ({ id, data }: UpdateCardType) => void
}

export const DeckTable: FC<Props> = props => {
  const { isMyDeck, cardsData, deleteCard, updateCard } = props

  return (
    <>
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
            return (
              <TableRow
                key={card.id}
                isMyDeck={isMyDeck}
                card={card}
                deleteCard={deleteCard}
                updateCard={updateCard}
              />
            )
          })}
        </Table.Body>
      </Table.Root>
    </>
  )
}
