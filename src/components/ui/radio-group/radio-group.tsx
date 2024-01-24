import { ElementRef, FC, forwardRef } from 'react'

import * as Radio from '@radix-ui/react-radio-group'
import { clsx } from 'clsx'

import s from './radio-group.module.scss'

import { Typography } from '@/components/ui/typography'

export type RadioType = {
  value: string
  label: string
  disabled?: boolean
}

export type RadioGroupProps = {
  radioButtons: Array<RadioType>
  value?: string
  onValueChange?: (value: string) => void
  defaultValue?: string
  disabled?: boolean
  className?: string
}

//TODO fix sizes

export const RadioGroup: FC<RadioGroupProps> = forwardRef<
  ElementRef<typeof Radio.Root>,
  RadioGroupProps
>(({ radioButtons, defaultValue, disabled, className, onValueChange, value }, ref) => {
  const classes = {
    root: clsx(s.root, className),
    label: clsx(s.label, disabled && s.disabled),
  }

  return (
    <Radio.Root
      className={classes.root}
      defaultValue={defaultValue}
      disabled={disabled}
      value={value}
      onValueChange={onValueChange}
      ref={ref}
    >
      {radioButtons.map(r => (
        <div className={s.itemWrapper} key={r.value}>
          <Radio.Item className={s.item} value={r.value} id={r.value} disabled={r.disabled}>
            <Radio.Indicator className={s.indicator} />
          </Radio.Item>
          <label className={classes.label} htmlFor={r.value}>
            <Typography variant={'body2'}>{r.label}</Typography>
          </label>
        </div>
      ))}
    </Radio.Root>
  )
})
