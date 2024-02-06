import { decksListTableHeader } from '@/common/data/decks-list-table-header.ts'
import { Table } from '@/components/ui/table'
import { Sort, TableHead } from '@/components/ui/table-head/table-head.tsx'
import { GetDecks } from '@/feature/decks-list/services'
import { DecksRow } from '@/feature/decks-list/ui/decks-row/decks-row.tsx'

type Props = {
  data: GetDecks
  userId: string
  sort: Sort
  setSort: (sort: Sort) => void
  isFetching: boolean
}

export const DecksTable = ({ data, userId, sort, setSort, isFetching }: Props) => {
  return (
    <>
      <Table.Root>
        <TableHead columns={decksListTableHeader} sort={sort} setSort={setSort} />

        <Table.Body>
          {data?.items?.map(deck => (
            <DecksRow key={deck.id} deck={deck} userId={userId} isFetching={isFetching} />
          ))}
        </Table.Body>
      </Table.Root>
    </>
  )
}
