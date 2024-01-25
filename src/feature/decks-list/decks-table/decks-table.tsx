import { FC } from 'react'

import { Table } from '@/components/ui/table'
import { TableHead } from '@/components/ui/table-head/table-head.tsx'
import { DecksRow } from '@/feature/decks-list/decks-row/decks-row.tsx'
import { DeckByIdArgs, GetDecksResponse, UpdateDeck } from '@/services/cards.types.ts'

const headColumns = [
  { fieldName: 'name', label: 'Name', sortable: true },
  { fieldName: 'cardsCount', label: 'Cards', sortable: true },
  { fieldName: 'updated', label: 'Last Updated', sortable: true },
  { fieldName: 'author.name', label: 'Created by', sortable: true },
  { fieldName: 'icons', label: '', sortable: false },
]

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
        <TableHead columns={headColumns} sort={sort} setSort={setSort} />

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
