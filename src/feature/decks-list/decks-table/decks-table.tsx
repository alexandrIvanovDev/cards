import { FC } from 'react'

import { Table } from '@/components/ui/table'
import { DecksRow } from '@/feature/decks-list/decks-row/decks-row.tsx'
import { DeckByIdArgs, UpdateDeck, GetDecksResponse } from '@/services/cards.types.ts'

type Props = {
  data: GetDecksResponse
  userId: string
  deleteDeck: (data: DeckByIdArgs) => void
  updateDeck: (data: UpdateDeck) => void
}

export const DecksTable: FC<Props> = ({ data, userId, deleteDeck, updateDeck }) => {
  return (
    <>
      <Table.Root>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Cards</Table.HeadCell>
            <Table.HeadCell>Last Updated</Table.HeadCell>
            <Table.HeadCell>Created by</Table.HeadCell>
            <Table.HeadCell style={{ width: 150 }}></Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {data?.items?.map(deck => (
            <DecksRow
              key={deck.id}
              deck={deck}
              userId={userId}
              deleteDeck={deleteDeck}
              updateDeck={updateDeck}
            />
          ))}
        </Table.Body>
      </Table.Root>
    </>
  )
}
