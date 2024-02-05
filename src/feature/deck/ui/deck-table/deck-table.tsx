import { deckTableHeader } from '@/common/data/deck-table-header.ts'
import { Table } from '@/components/ui/table'
import { Sort, TableHead } from '@/components/ui/table-head'
import { TableRow } from '@/feature/deck/ui/deck-row/table-row.tsx'
import { DeleteCardsArgs, GetCardsResponse, UpdateCardType } from '@/services/cards.types.ts'

type Props = {
  isMyDeck: boolean
  cardsData: GetCardsResponse
  deleteCard: (data: DeleteCardsArgs) => void
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
