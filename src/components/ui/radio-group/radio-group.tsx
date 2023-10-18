import { FC } from 'react'

import * as Radio from '@radix-ui/react-radio-group'
import { clsx } from 'clsx'

import s from './radio-group.module.scss'

export type RadioType = {
  value: string
  label: string
  disabled?: boolean
}

type Props = {
  radioButtons: Array<RadioType>
  defaultValue?: string
  disabled?: boolean
}

export const RadioGroup: FC<Props> = ({ radioButtons, defaultValue, disabled }) => {
  const classes = {
    label: clsx(s.label, disabled && s.disabled),
  }

  return (
    <Radio.Root className={s.root} defaultValue={defaultValue} disabled={disabled}>
      {radioButtons.map(r => (
        <div className={s.itemWrapper} key={r.value}>
          <Radio.Item className={s.item} value={r.value} id={r.value} disabled={r.disabled}>
            <Radio.Indicator className={s.indicator} />
          </Radio.Item>
          <label className={classes.label} htmlFor={r.value}>
            {r.label}
          </label>
        </div>
      ))}
    </Radio.Root>
  )
}
