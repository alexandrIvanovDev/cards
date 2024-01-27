import { decksListTableHeader } from '@/common/data/decks-list-table-header.ts'
import { Table } from '@/components/ui/table'
import { Sort, TableHead } from '@/components/ui/table-head/table-head.tsx'
import { DecksRow } from '@/feature/decks-list/decks-row/decks-row.tsx'
import { GetDecksResponse } from '@/services/cards.types.ts'

type Props = {
  data: GetDecksResponse
  userId: string
  sort: Sort
  setSort: (sort: Sort) => void
}

export const DecksTable = ({ data, userId, sort, setSort }: Props) => {
  return (
    <>
      <Table.Root>
        <TableHead columns={decksListTableHeader} sort={sort} setSort={setSort} />

        <Table.Body>
          {data?.items?.map(deck => <DecksRow key={deck.id} deck={deck} userId={userId} />)}
        </Table.Body>
      </Table.Root>
    </>
  )
}
