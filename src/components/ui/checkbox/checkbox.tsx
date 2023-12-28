import { FC } from 'react'

import * as RadixCheckbox from '@radix-ui/react-checkbox'
import * as Label from '@radix-ui/react-label'
import { clsx } from 'clsx'

import s from './checkbox.module.scss'

import { CheckIcon } from '@/assets/icons/Check.tsx'

type Props = {
  checked: boolean
  onChange: (value: boolean) => void
  id?: string
  disabled?: boolean
}

export const Checkbox: FC<Props> = props => {
  const { checked, onChange, disabled, id } = props

  const classes = {
    label: clsx(s.label, disabled && s.disabled),
    indicator: clsx(s.indicator, disabled && s.indicatorDisabled),
  }

  return (
    <div className={s.wrapper}>
      <RadixCheckbox.Root
        id={id}
        checked={checked}
        onCheckedChange={onChange}
        className={s.root}
        disabled={disabled}
      >
        {checked && (
          <RadixCheckbox.Indicator className={classes.indicator} forceMount>
            <CheckIcon className={s.icon} />
          </RadixCheckbox.Indicator>
        )}
      </RadixCheckbox.Root>
      <Label.Root htmlFor={id} className={classes.label}>
        Check
      </Label.Root>
    </div>
  )
}
