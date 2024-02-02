import { FC } from 'react'

import s from './search.module.scss'

import { TextField } from '@/components/ui/textfield'

type Props = {
  value: string
  setValue: (value: string) => void
}

export const SearchCard: FC<Props> = ({ value, setValue }) => {
  return (
    <TextField
      type="search"
      placeholder="Card search"
      className={s.searchInput}
      value={value}
      onChange={e => setValue(e.currentTarget.value)}
    />
  )
}
