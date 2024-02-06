import { useTranslation } from 'react-i18next'

import s from './search.module.scss'

import { TextField } from '@/components/ui/textfield'

type Props = {
  value: string
  setValue: (value: string) => void
}

export const SearchCard = ({ value, setValue }: Props) => {
  const { t } = useTranslation()

  const clearValue = () => {
    setValue('')
  }

  return (
    <TextField
      type="search"
      placeholder={t('Card search')}
      className={s.searchInput}
      value={value}
      onChange={e => setValue(e.currentTarget.value)}
      clearValue={clearValue}
    />
  )
}
