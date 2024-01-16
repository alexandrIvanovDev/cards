import { FC } from 'react'

import { Link } from 'react-router-dom'

import s from './decks-row.module.scss'

import { routePaths } from '@/app/providers/router'
import { DeleteIcon } from '@/assets/icons/Delete.tsx'
import { EditIcon } from '@/assets/icons/Edit.tsx'
import { PlayIcon } from '@/assets/icons/Play.tsx'
import { Table } from '@/components/ui/table'
import { Typography } from '@/components/ui/typography'
import { DeckByIdArgs, DecksResponseItems } from '@/services/cards.types.ts'

type Props = {
  deck: DecksResponseItems
  isMyDeck: boolean
  // deleteDeckIsOpen: boolean
  // setDeleteDeckIsOpen: (value: boolean) => void
  deleteDeck: (data: DeckByIdArgs) => void
}

export const DecksRow: FC<Props> = props => {
  const { deck, isMyDeck, deleteDeck } = props

  return (
    <Table.Row className={s.row}>
      <Table.Cell className={s.nameCell}>
        <Typography as={Link} to={`${routePaths.packs}/${deck.id}`} className={s.name}>
          {deck?.name}
        </Typography>
      </Table.Cell>
      <Table.Cell className={s.count}>{deck?.cardsCount}</Table.Cell>
      <Table.Cell className={s.updated}>{new Date(deck?.updated).toLocaleDateString()}</Table.Cell>
      <Table.Cell className={s.author}>{deck?.author?.name}</Table.Cell>
      <Table.Cell className={s.tableIcons}>
        <PlayIcon className={s.icon} />
        {isMyDeck && <EditIcon className={s.icon} />}
        {isMyDeck && <DeleteIcon className={s.icon} onClick={() => deleteDeck({ id: deck.id })} />}
      </Table.Cell>
    </Table.Row>
  )
}
