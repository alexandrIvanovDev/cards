import { useTranslation } from 'react-i18next'

import s from './decks-header.module.scss'

import { DeckForm } from '@/components/forms/deck-form'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { Typography } from '@/components/ui/typography'

type Props = {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  createDeck: (data: FormData) => void
  isFetching: boolean
}

export const DecksHeader = ({ isOpen, setIsOpen, createDeck, isFetching }: Props) => {
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
      <Modal
        trigger={
          <Button disabled={isFetching}>
            <Typography variant={'subtitle2'} as={'span'}>
              {t('Add New Deck')}
            </Typography>
          </Button>
        }
        title={t('Add New Deck')}
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <DeckForm onSubmit={addNewCard} setIsOpen={setIsOpen} btnText={t('Add New Deck')} />
      </Modal>
    </div>
  )
}
