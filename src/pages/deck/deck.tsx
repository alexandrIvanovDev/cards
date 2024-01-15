import { useState } from 'react'

import { clsx } from 'clsx'
import { Link, useParams } from 'react-router-dom'

import s from './deck.module.scss'

import { ArrowBackIcon } from '@/assets/icons/ArrowBack.tsx'
import { DeleteIcon } from '@/assets/icons/Delete.tsx'
import { EditIcon } from '@/assets/icons/Edit.tsx'
import { PlayIcon } from '@/assets/icons/Play.tsx'
import { Button } from '@/components/ui/button'
import { Dropdown, DropDownItemWithIcon } from '@/components/ui/dropdown'
import { Modal } from '@/components/ui/modal'
import { ProgressBar } from '@/components/ui/progress-bar'
import { Table } from '@/components/ui/table'
import { TextField } from '@/components/ui/textfield'
import { Typography } from '@/components/ui/typography'
import { useMeQuery } from '@/services/auth/auth.service.ts'
import { useGetCardsQuery, useGetDeckByIdQuery } from '@/services/deck.service.ts'

export const Deck = () => {
  const { id } = useParams()
  const { data, isLoading } = useGetDeckByIdQuery({ id: id as string })
  const { data: cards } = useGetCardsQuery({ id: id as string })
  const { data: userData } = useMeQuery()

  const [open, setOpen] = useState(false)

  const classes = {
    addCardButton: clsx(!cards?.items.length && s.hidden),
  }

  if (isLoading) return <ProgressBar />

  return (
    <div className={s.content}>
      <Button as={Link} to={'..'} variant="link" className={s.btnBack}>
        <ArrowBackIcon className={s.iconBack} /> <Typography>Back to previous page</Typography>
      </Button>
      <div>
        <div className={s.titleWrapper}>
          <div className={s.title}>
            <Typography as="h2" variant="large">
              {data?.name}
            </Typography>
            {data?.userId === userData?.id && (
              <Dropdown>
                <div>
                  <DropDownItemWithIcon icon={<PlayIcon />} text={'Learn'} />
                  <DropDownItemWithIcon icon={<EditIcon />} text={'Edit'} />
                  <DropDownItemWithIcon icon={<DeleteIcon />} text={'Delete'} />
                </div>
              </Dropdown>
            )}
          </div>
          {data?.userId === userData?.id ? (
            <Button className={classes.addCardButton}>Add New Card</Button>
          ) : (
            <Button>Learn Deck</Button>
          )}
        </div>
        {cards?.items.length ? (
          <>
            <TextField type="search" placeholder="Card search" className={s.searchInput} />
            <Table.Root>
              <Table.Head>
                <Table.Row>
                  <Table.HeadCell>Question</Table.HeadCell>
                  <Table.HeadCell>Answer</Table.HeadCell>
                  <Table.HeadCell>Last Updated</Table.HeadCell>
                  <Table.HeadCell>Grade</Table.HeadCell>
                </Table.Row>
              </Table.Head>
              {cards?.items.map(card => {
                return (
                  <Table.Body key={card.id}>
                    <Table.Row>
                      <Table.Cell>{card.question}</Table.Cell>
                      <Table.Cell>{card.answer}</Table.Cell>
                      <Table.Cell>
                        {new Date(card?.updated as string).toLocaleDateString()}
                      </Table.Cell>
                      <Table.Cell>{card.shots}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                )
              })}
            </Table.Root>
          </>
        ) : (
          <div className={s.notification}>
            <div className={s.text}>This deck is empty. Click add new card to fill this deck</div>
            <Modal
              open={open}
              onOpenChange={() => setOpen(!open)}
              trigger={<Button>Add New Card</Button>}
              title="Add New Card"
            >
              <div className={s.modalContent}>
                <TextField label="Question" />
                <TextField label="Answer" />
                <div className={s.modalButtons}>
                  <Button variant="secondary" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button>Add new card</Button>
                </div>
              </div>
            </Modal>
          </div>
        )}
      </div>
    </div>
  )
}
