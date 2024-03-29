import { useState } from 'react'

import { useTranslation } from 'react-i18next'

import s from './table-row.module.scss'

import { DeleteIcon } from '@/assets/icons/Delete.tsx'
import { EditIcon } from '@/assets/icons/Edit.tsx'
import { useAppSelector } from '@/common/hooks/use-app-selector.ts'
import { Cover } from '@/components/ui/cover'
import { Rating } from '@/components/ui/rating'
import { Skeleton } from '@/components/ui/skeleton'
import { Table } from '@/components/ui/table'
import { Typography } from '@/components/ui/typography'
import {
  useDeleteCardMutation,
  useUpdateCardMutation,
} from '@/feature/deck/services/deck.service.ts'
import { CardItem } from '@/feature/deck/services/deck.types.ts'
import { CardModal } from '@/feature/deck/ui/card-modal/card-modal.tsx'
import { DeleteEntityModal } from '@/feature/decks-list/ui/delete-entity-modal/delete-entity-modal.tsx'

type Props = {
  isMyDeck: boolean
  card: CardItem
}

export const TableRow = ({ card, isMyDeck }: Props) => {
  const isLoading = useAppSelector(state => state.loading.isLoading)

  const [deleteCard] = useDeleteCardMutation()
  const [updateCard] = useUpdateCardMutation()

  const [deleteCardIsOpen, setDeleteCardIsOpen] = useState(false)
  const [updateCardIsOpen, setUpdateCardIsOpen] = useState(false)

  const { t } = useTranslation()

  const editCard = (data: FormData) => {
    updateCard({ id: card.id, data })
    setUpdateCardIsOpen(false)
  }

  return (
    <>
      <Table.Row className={s.row}>
        <Table.Cell className={s.questionCell} data-th={'Question'}>
          <div className={s.questionWrapper}>
            {isLoading ? (
              <Skeleton className={s.skeleton} />
            ) : (
              <Cover cover={card?.questionImg} className={s.questionCover} />
            )}
            <Typography variant={'body2'}>{card?.question}</Typography>
          </div>
        </Table.Cell>
        <Table.Cell className={s.answerCell} data-th={'Answer'}>
          <div className={s.answerWrapper}>
            {isLoading ? (
              <Skeleton className={s.skeleton} />
            ) : (
              <Cover cover={card?.answerImg} className={s.answerCover} />
            )}
            <Typography variant={'body2'}>{card?.answer}</Typography>
          </div>
        </Table.Cell>
        <Table.Cell className={s.updatedCell} data-th={'Last Updated'}>
          <Typography variant={'body2'}>
            {new Date(card?.updated as string).toLocaleDateString()}
          </Typography>
        </Table.Cell>
        <Table.Cell className={s.ratingCell} data-th={'Grade'}>
          <Rating rating={card.grade} className={s.rating} />
        </Table.Cell>

        {isMyDeck && (
          <Table.Cell className={s.iconsCell}>
            <div className={s.iconWrapper}>
              <button className={s.btn} onClick={() => setUpdateCardIsOpen(true)}>
                <EditIcon className={s.icon} />
              </button>
              <button className={s.btn} onClick={() => setDeleteCardIsOpen(true)}>
                <DeleteIcon className={s.icon} />
              </button>
            </div>
          </Table.Cell>
        )}
      </Table.Row>

      <>
        <DeleteEntityModal
          title={t('Delete Card')}
          open={deleteCardIsOpen}
          onOpenChange={setDeleteCardIsOpen}
          text={t('this card')}
          btnText={t('Delete Card')}
          callback={() => deleteCard({ id: card.id })}
        />
        <CardModal
          title={t('Edit Card')}
          open={updateCardIsOpen}
          onOpenChange={setUpdateCardIsOpen}
          onSubmit={editCard}
          question={card.question}
          answer={card.answer}
          questionImg={card.questionImg}
          answerImg={card.answerImg}
          buttonText={t('Save Changes')}
        />
      </>
    </>
  )
}
