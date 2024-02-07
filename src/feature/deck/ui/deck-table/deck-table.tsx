import { deckTableHeader } from '@/common/data/deck-table-header.ts'
import { Table } from '@/components/ui/table'
import { Sort, TableHead } from '@/components/ui/table-head'
import { DeleteCardArgs, GetCards, UpdateCardType } from '@/feature/deck/services/deck.types.ts'
import { TableRow } from '@/feature/deck/ui/deck-row/table-row.tsx'

type Props = {
  isMyDeck: boolean
  cardsData: GetCards
  deleteCard: (data: DeleteCardArgs) => void
  updateCard: ({ id, data }: UpdateCardType) => void
  sort: Sort
  setSort: (value: Sort) => void
}

export const DeckTable = (props: Props) => {
  const { isMyDeck, cardsData, deleteCard, updateCard, sort, setSort } = props

  const columns = deckTableHeader.filter(col => (isMyDeck ? col : col.fieldName !== 'controls'))

  return (
    <>
      <Table.Root>
        <TableHead columns={columns} sort={sort} setSort={setSort} />

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
