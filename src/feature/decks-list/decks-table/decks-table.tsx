import { FC } from 'react'

import { Table } from '@/components/ui/table'
import { DecksRow } from '@/feature/decks-list/decks-row/decks-row.tsx'
import { DeckByIdArgs, GetDecksResponse } from '@/services/cards.types.ts'

type Props = {
  data: GetDecksResponse
  userId: string
  deleteDeck: (data: DeckByIdArgs) => void
}

export const DecksTable: FC<Props> = props => {
  const { data, userId, deleteDeck } = props

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
          {data?.items?.map(deck => {
            const isMyDeck = userId === deck?.userId

            return (
              <DecksRow
                key={deck.id}
                deck={deck}
                isMyDeck={isMyDeck}
                // deleteDeckIsOpen={deleteDeckIsOpen}
                // setDeleteDeckIsOpen={setDeleteDeckIsOpen}
                deleteDeck={deleteDeck}
              />
            )
          })}
        </Table.Body>
      </Table.Root>
    </>
  )
}
