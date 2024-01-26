import { FC } from 'react'

import { decksListTableHeader } from '@/common/data/decks-list-table-header.ts'
import { Table } from '@/components/ui/table'
import { TableHead } from '@/components/ui/table-head/table-head.tsx'
import { DecksRow } from '@/feature/decks-list/decks-row/decks-row.tsx'
import { DeckByIdArgs, GetDecksResponse, UpdateDeck } from '@/services/cards.types.ts'

type Props = {
  data: GetDecksResponse
  userId: string
  deleteDeck: (data: DeckByIdArgs) => void
  updateDeck: (data: UpdateDeck) => void
  sort: any
  setSort: (sort: any) => void
}

export const DecksTable: FC<Props> = props => {
  const { data, userId, deleteDeck, updateDeck, sort, setSort } = props

  return (
    <>
      <Table.Root>
        <TableHead columns={decksListTableHeader} sort={sort} setSort={setSort} />

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
