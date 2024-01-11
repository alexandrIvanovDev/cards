import s from './decks.module.scss'

import { Button } from '@/components/ui/button'
import { Loader } from '@/components/ui/loader'
import { Table } from '@/components/ui/table'
import { useCreateDeckMutation, useGetDecksQuery } from '@/services/deck.service.ts'

export const Decks = () => {
  const { data, isLoading, error } = useGetDecksQuery()

  // const { data: deckData } = useGetDeckByIdQuery({ id: 'clp8icyvs01luwv2qpvzyigp8' })

  const [createDeck] = useCreateDeckMutation()

  if (isLoading) return <Loader />

  if (error) {
    // @ts-ignore
    return <div>{JSON.stringify(error.data.message)}</div>
  }

  return (
    <div className={s.content}>
      <Button onClick={() => createDeck({ name: '111' })}>Create new deck</Button>
      <Table.Root>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Cards</Table.HeadCell>
            <Table.HeadCell>Last Updated</Table.HeadCell>
            <Table.HeadCell>Created by</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {data?.items?.map(deck => {
            return (
              <Table.Row key={deck.id}>
                <Table.Cell>{deck?.name}</Table.Cell>
                <Table.Cell>{deck?.cardsCount}</Table.Cell>
                <Table.Cell>{new Date(deck?.updated).toLocaleDateString()}</Table.Cell>
                <Table.Cell>{deck?.author?.name}</Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table.Root>
    </div>
  )
}
