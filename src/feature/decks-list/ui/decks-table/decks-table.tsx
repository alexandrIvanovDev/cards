import s from './decks-table.module.scss'

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
  getDecksIsFetching: boolean
  getDecksIsLoading: boolean
}

export const DecksTable = (props: Props) => {
  const { data, userId, sort, setSort, getDecksIsFetching, getDecksIsLoading } = props

  return (
    <>
      <Table.Root>
        <TableHead columns={decksListTableHeader} sort={sort} setSort={setSort} />

        <Table.Body className={s.tableBody}>
          {data?.items?.map(deck => (
            <DecksRow
              key={deck.id}
              deck={deck}
              userId={userId}
              getDecksIsFetching={getDecksIsFetching}
              getDecksIsLoading={getDecksIsLoading}
            />
          ))}
        </Table.Body>
      </Table.Root>
    </>
  )
}
