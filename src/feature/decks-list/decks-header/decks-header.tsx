import { FC } from 'react'

import s from './decks-header.module.scss'

import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { Typography } from '@/components/ui/typography'
import { DeckForm } from '@/feature/decks-list/deck-form/deck-form.tsx'
import { DeckArgs } from '@/services/cards.types.ts'

type Props = {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  createDeck: (data: DeckArgs) => void
}

export const DecksHeader: FC<Props> = ({ isOpen, setIsOpen, createDeck }) => {
  const addNewCard = (data: DeckArgs) => {
    createDeck({ ...data })
    setIsOpen(false)
  }

  return (
    <div className={s.titleWrapper}>
      <Typography variant="large" as="h2">
        Packs List
      </Typography>
      <Modal
        trigger={<Button>Add New Deck</Button>}
        title="Add New Deck"
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <DeckForm onSubmit={addNewCard} setIsOpen={setIsOpen} btnText={'Add New Deck'} />
      </Modal>
    </div>
  )
}
