import { useState } from 'react'

import s from './table-row.module.scss'

import { DeleteIcon } from '@/assets/icons/Delete.tsx'
import { EditIcon } from '@/assets/icons/Edit.tsx'
import { Cover } from '@/components/ui/cover'
import { Rating } from '@/components/ui/rating'
import { Skeleton } from '@/components/ui/skeleton'
import { Table } from '@/components/ui/table'
import { Typography } from '@/components/ui/typography'
import { DeleteEntityModal } from '@/feature/decks-list/delete-entity-modal/delete-entity-modal.tsx'
import { CardModal } from '@/pages/deck/card-modal/cardModal.tsx'
import { useGetCardsQuery } from '@/services/cards.service.ts'
import { CardsResponseItems, DeleteCardsArgs, UpdateCardType } from '@/services/cards.types.ts'

type Props = {
  isMyDeck: boolean
  card: CardsResponseItems
  deleteCard: (data: DeleteCardsArgs) => void
  updateCard: ({ id, data }: UpdateCardType) => void
}

export const TableRow = ({ card, isMyDeck, deleteCard, updateCard }: Props) => {
  const [deleteCardIsOpen, setDeleteCardIsOpen] = useState(false)
  const [updateCardIsOpen, setUpdateCardIsOpen] = useState(false)

  const { isLoading: getCardsIsLoading, isFetching } = useGetCardsQuery({ id: card.deckId })

  const editCard = (data: FormData) => {
    updateCard({ id: card.id, data })
    setUpdateCardIsOpen(false)
  }

  const isLoading = getCardsIsLoading || isFetching

  return (
    <>
      <Table.Row className={s.row}>
        <Table.Cell>
          <div className={s.questionWrapper}>
            {isLoading ? <Skeleton className={s.skeleton} /> : <Cover cover={card?.questionImg} />}
            <Typography variant={'body2'}>{card?.question}</Typography>
          </div>
        </Table.Cell>
        <Table.Cell className={s.answerCell}>
          <div className={s.answerWrapper}>
            {isLoading ? <Skeleton className={s.skeleton} /> : <Cover cover={card?.answerImg} />}
            <Typography variant={'body2'}>{card?.answer}</Typography>
          </div>
        </Table.Cell>
        <Table.Cell className={s.updatedCell}>
          {new Date(card?.updated as string).toLocaleDateString()}
        </Table.Cell>
        <Table.Cell className={s.ratingCell}>
          <Rating rating={card.grade} className={s.rating} />
        </Table.Cell>

        {isMyDeck && (
          <Table.Cell className={s.iconsCell}>
            <div className={s.iconWrapper}>
              <EditIcon onClick={() => setUpdateCardIsOpen(true)} className={s.icon} />
              <DeleteIcon onClick={() => setDeleteCardIsOpen(true)} className={s.icon} />
            </div>
          </Table.Cell>
        )}
      </Table.Row>

      <>
        <DeleteEntityModal
          title="Delete Card"
          open={deleteCardIsOpen}
          onOpenChange={setDeleteCardIsOpen}
          text={'this card'}
          btnText="Delete Card"
          callback={() => deleteCard({ id: card.id })}
        />
        <CardModal
          title="Edit Card"
          open={updateCardIsOpen}
          onOpenChange={setUpdateCardIsOpen}
          onSubmit={editCard}
          question={card.question}
          answer={card.answer}
          questionImg={card.questionImg}
          answerImg={card.answerImg}
          buttonText="Save Changes"
        />
      </>
    </>
  )
}
