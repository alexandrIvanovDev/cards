import { useState } from 'react'

import { useTranslation } from 'react-i18next'

import s from './deck-form.module.scss'

import { ImageIcon } from '@/assets/icons/Image.tsx'
import { ControlledCheckbox, ControlledTextField } from '@/components/controlled'
import { DeckFormType, useDeckForm } from '@/components/forms/deck-form/use-deck-form.ts'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { Uploader } from '@/components/ui/uploader/uploader.tsx'
import { DeckArgs } from '@/services/cards.types.ts'

type Props = {
  onSubmit: (data: FormData) => void
  setIsOpen: (value: boolean) => void
  btnText: string
  data?: DeckArgs
  disabled?: boolean
}

export const DeckForm = ({ onSubmit, setIsOpen, btnText, data, disabled }: Props) => {
  const { control, handleSubmit, errors } = useDeckForm(data as DeckArgs)

  const { t } = useTranslation()

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
        label={t('Name pack')}
        control={control}
        name={'name'}
        error={errors.name?.message}
        autoFocus
      />
      {(url || data?.cover) && <img src={url} alt={'cover'} className={s.cover} />}
      <Uploader loadFile={setFile}>
        <ImageIcon className={s.icon} />
        <Typography variant={'subtitle2'}>{url ? t('Change cover') : t('Upload Image')}</Typography>
      </Uploader>
      <ControlledCheckbox control={control} name={'isPrivate'} label={t('Private pack')} />
      <div className={s.modalButtons}>
        <Button variant="secondary" type="button" onClick={() => setIsOpen(false)}>
          <Typography variant={'subtitle2'} as={'span'}>
            {t('Cancel')}
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
