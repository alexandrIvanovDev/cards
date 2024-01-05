import { FC } from 'react'

import * as RadixCheckbox from '@radix-ui/react-checkbox'
import { clsx } from 'clsx'

import s from './checkbox.module.scss'

import { CheckIcon } from '@/assets/icons/Check.tsx'
import { Typography } from '@/components/ui/typography'

type Props = {
  checked: boolean
  onChange: (value: boolean) => void
  label?: string
  disabled?: boolean
  className?: string
}

export const Checkbox: FC<Props> = ({ checked, onChange, disabled, label, className }) => {
  const classes = {
    label: clsx(s.label, disabled && s.disabled, className),
    wrapper: clsx(s.checkboxWrapper, disabled && s.disabled),
    indicator: clsx(s.indicator, disabled && s.indicatorDisabled),
  }

  return (
    <Typography as="label" className={classes.label}>
      <div className={classes.wrapper}>
        <RadixCheckbox.Root
          checked={checked}
          onCheckedChange={onChange}
          className={s.checkbox}
          disabled={disabled}
        >
          {checked && (
            <RadixCheckbox.Indicator className={classes.indicator} forceMount>
              <CheckIcon className={s.icon} />
            </RadixCheckbox.Indicator>
          )}
        </RadixCheckbox.Root>
      </div>
      {label}
    </Typography>
  )
}
