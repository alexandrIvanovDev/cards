import s from './deck-table.module.scss'

import { deckTableHeader } from '@/common/data/deck-table-header.ts'
import { Table } from '@/components/ui/table'
import { Sort, TableHead } from '@/components/ui/table-head'
import { GetCards } from '@/feature/deck/services'
import { TableRow } from '@/feature/deck/ui/deck-row/table-row.tsx'

type Props = {
  isMyDeck: boolean
  cardsData: GetCards
  sort: Sort
  setSort: (value: Sort) => void
}

export const DeckTable = (props: Props) => {
  const { isMyDeck, cardsData, sort, setSort } = props

  const columns = deckTableHeader.filter(col => (isMyDeck ? col : col.fieldName !== 'controls'))

  return (
    <>
      <Table.Root>
        <TableHead columns={columns} sort={sort} setSort={setSort} />

        <Table.Body className={s.tableBody}>
          {cardsData?.items.map(card => <TableRow key={card.id} isMyDeck={isMyDeck} card={card} />)}
        </Table.Body>
      </Table.Root>
    </>
  )
}
