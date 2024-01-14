import { useState } from 'react'

import { Link } from 'react-router-dom'

import s from './packs-list.module.scss'

import { routePaths } from '@/app/providers/router'
import { DeleteIcon } from '@/assets/icons/Delete.tsx'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Modal } from '@/components/ui/modal'
import { ProgressBar } from '@/components/ui/progress-bar/progress-bar.tsx'
import { Slider } from '@/components/ui/slider'
import { Table } from '@/components/ui/table'
import { Tabs } from '@/components/ui/tabs'
import { TextField } from '@/components/ui/textfield'
import { Typography } from '@/components/ui/typography'
import { useCreateDeckMutation, useGetDecksQuery } from '@/services/deck.service.ts'

export const PacksList = () => {
  const { data, isLoading } = useGetDecksQuery()

  const [createDeck, { isLoading: isCreateLoading }] = useCreateDeckMutation()

  const [value, setValue] = useState([2, 10])

  const [openModal, setOpenModal] = useState(false)

  const [newPackName, setNewPackName] = useState('')

  const onChange = (value: Array<number>) => {
    setValue(value)
  }

  const [tabsValue, setTabsValue] = useState<string>('all')

  const addNewPack = () => {
    createDeck({ name: newPackName })
    setOpenModal(false)
  }

  if (isLoading) {
    return <ProgressBar />
  }

  return (
    <div className={s.content}>
      {isCreateLoading && <ProgressBar />}
      <div className={s.titleWrapper}>
        <Typography variant="large" as="h2">
          Packs List
        </Typography>
        <Modal
          trigger={<Button>Add new pack</Button>}
          title="Add new pack"
          open={openModal}
          onOpenChange={setOpenModal}
        >
          <div className={s.modalContent}>
            <TextField
              label="Name pack"
              value={newPackName}
              onChange={e => setNewPackName(e.currentTarget.value)}
            ></TextField>
            <Checkbox checked={false} onChange={() => {}} label="Private pack" />
            <div className={s.modalButtons}>
              <Button variant="secondary" onClick={() => setOpenModal(false)}>
                Cancel
              </Button>
              <Button onClick={addNewPack}>Add new pack</Button>
            </div>
          </div>
        </Modal>
      </div>
      <div className={s.settingsWrapper}>
        <TextField type="search" placeholder="Input search" className={s.input} />
        <Tabs
          tabs={[
            { value: 'my', text: 'My Cards' },
            { value: 'all', text: 'All Cards' },
          ]}
          value={tabsValue}
          onValueChange={setTabsValue}
          label="Show packs cards"
        />
        <Slider min={0} max={20} value={value} onValueChange={onChange} label="Number of cards" />
        <Button variant="secondary">
          <DeleteIcon style={{ fill: 'white' }} /> Clear filter
        </Button>
      </div>
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
              <Table.Row key={deck?.id}>
                <Table.Cell className={s.nameCell}>
                  <Link to={`${routePaths.packs}/${deck.id}`} className={s.btn}>
                    {deck?.name}
                  </Link>
                </Table.Cell>
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
