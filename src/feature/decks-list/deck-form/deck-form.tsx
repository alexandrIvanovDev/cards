import { FC, useState } from 'react'

import s from './deck-form.module.scss'

import { ImageIcon } from '@/assets/icons/Image.tsx'
import { ControlledCheckbox, ControlledTextField } from '@/components/controlled'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { Uploader } from '@/components/ui/uploader/uploader.tsx'
import { DeckFormType, useDeckForm } from '@/feature/decks-list/deck-form/use-deck-form.ts'
import { DeckArgs } from '@/services/cards.types.ts'

type Props = {
  onSubmit: (data: FormData) => void
  setIsOpen: (value: boolean) => void
  btnText: string
  data?: DeckArgs
  disabled?: boolean
}

export const DeckForm: FC<Props> = ({ onSubmit, setIsOpen, btnText, data, disabled }) => {
  const { control, handleSubmit, errors } = useDeckForm(data as DeckArgs)

  const [file, setFile] = useState<File>()

  let url = file && URL.createObjectURL(file)

  if (!url && data?.cover) {
    url = data.cover
  }

  const onSubmitData = (data: DeckFormType) => {
    const form = new FormData()

    form.append('name', data.name)
    form.append('isPrivate', `${data.isPrivate}`)
    file && form.append('cover', file)

    onSubmit(form)
  }

  return (
    <form className={s.modalContent} onSubmit={handleSubmit(onSubmitData)}>
      <ControlledTextField
        label="Name pack"
        control={control}
        name={'name'}
        error={errors.name?.message}
        autoFocus
      />
      {(url || data?.cover) && <img src={url} alt={'cover'} className={s.cover} />}
      <Uploader loadFile={setFile}>
        <ImageIcon className={s.icon} />
        <Typography variant={'subtitle2'}>{url ? 'Change cover' : 'Upload file'}</Typography>
      </Uploader>
      <ControlledCheckbox control={control} name={'isPrivate'} label="Private pack" />
      <div className={s.modalButtons}>
        <Button variant="secondary" type="button" onClick={() => setIsOpen(false)}>
          <Typography variant={'subtitle2'} as={'span'}>
            Cancel
          </Typography>
        </Button>
        <Button type="submit" disabled={disabled}>
          <Typography variant={'subtitle2'} as={'span'}>
            {btnText}
          </Typography>
        </Button>
      </div>
    </form>
  )
}
