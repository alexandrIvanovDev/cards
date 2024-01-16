import { FC, KeyboardEvent } from 'react'

import s from './decks-header.module.scss'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Modal } from '@/components/ui/modal'
import { TextField } from '@/components/ui/textfield'
import { Typography } from '@/components/ui/typography'

type Props = {
  addNewPackIsOpen: boolean
  setAddNewPackIsOpen: (value: boolean) => void
  addNewPack: () => void
  newPackName: string
  setNewPackName: (value: string) => void
}

export const DecksHeader: FC<Props> = props => {
  const { addNewPackIsOpen, setAddNewPackIsOpen, addNewPack, setNewPackName, newPackName } = props

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addNewPack()
    }
  }

  return (
    <div className={s.titleWrapper}>
      <Typography variant="large" as="h2">
        Packs List
      </Typography>
      <Modal
        trigger={<Button>Add new pack</Button>}
        title="Add new pack"
        open={addNewPackIsOpen}
        onOpenChange={setAddNewPackIsOpen}
      >
        <div className={s.modalContent}>
          <TextField
            label="Name pack"
            value={newPackName}
            onChange={e => setNewPackName(e.currentTarget.value)}
            onKeyDown={onKeyPressHandler}
            autoFocus
          />
          <Checkbox checked={false} onChange={() => {}} label="Private pack" />
          <div className={s.modalButtons}>
            <Button variant="secondary" onClick={() => setAddNewPackIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={addNewPack}>Add new pack</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
