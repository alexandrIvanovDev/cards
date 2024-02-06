import { useState } from 'react'

import { useTranslation } from 'react-i18next'

import s from './decks-header.module.scss'

import { DeckForm } from '@/components/forms/deck-form'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { Typography } from '@/components/ui/typography'

type Props = {
  createDeck: (data: FormData) => void
  disabled: boolean
}

export const DecksHeader = ({ createDeck, disabled }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const { t } = useTranslation()

  const addNewCard = (data: FormData) => {
    createDeck(data)
    setIsOpen(false)
  }

  return (
    <div className={s.titleWrapper}>
      <Typography variant="large" as="h2">
        {t('Packs List')}
      </Typography>
      <Modal title={t('Add New Deck')} open={isOpen} onOpenChange={setIsOpen}>
        <DeckForm onSubmit={addNewCard} setIsOpen={setIsOpen} btnText={t('Add New Deck')} />
      </Modal>
      <Button disabled={disabled} onClick={() => setIsOpen(true)}>
        <Typography variant={'subtitle2'} as={'span'}>
          {t('Add New Deck')}
        </Typography>
      </Button>
    </div>
  )
}
