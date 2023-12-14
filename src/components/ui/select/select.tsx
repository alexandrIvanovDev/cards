import { FC } from 'react'

import { ChevronDownIcon } from '@radix-ui/react-icons'
import * as Label from '@radix-ui/react-label'
import * as RadixSelect from '@radix-ui/react-select'
import { clsx } from 'clsx'

import s from './select.module.scss'

import { Typography } from '@/components/ui/typography'

type Option = {
  value: string
  label: string
}

type Props = {
  options: Array<Option>
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  placeholder?: string
  label?: string
}

export const Select: FC<Props> = props => {
  const { options, onChange, disabled, value, label, placeholder } = props

  const classes = {
    label: clsx(s.label, disabled && s.disabledLabel),
  }

  return (
    <Label.Root className={s.root}>
      <Typography variant="body2" as="label" className={classes.label}>
        {label}
      </Typography>
      <RadixSelect.Root onValueChange={onChange} value={value} disabled={disabled}>
        <RadixSelect.Trigger className={s.trigger} asChild>
          <div>
            <RadixSelect.Value placeholder={placeholder} />
            <RadixSelect.Icon className={s.iconWrapper}>
              <ChevronDownIcon className={s.icon} />
            </RadixSelect.Icon>
          </div>
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
          <RadixSelect.Content className={s.content} position="popper" sideOffset={-1}>
            <RadixSelect.Viewport>
              {options.map(o => (
                <RadixSelect.Item value={o.value} key={o.value} className={s.item}>
                  <RadixSelect.ItemText>{o.label}</RadixSelect.ItemText>
                </RadixSelect.Item>
              ))}
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    </Label.Root>
  )
}
