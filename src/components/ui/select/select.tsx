import { ElementRef, forwardRef } from 'react'

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

export type SelectProps = {
  options: Array<Option>
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  placeholder?: string
  label?: string
  required?: boolean
  className?: string
  smallSize?: boolean
}

export const Select = forwardRef<ElementRef<typeof RadixSelect.Root>, SelectProps>(
  (
    { options, onChange, disabled, value, label, placeholder, required, className, smallSize },
    ref
  ) => {
    const classes = {
      label: clsx(s.label, disabled && s.disabledLabel),
      trigger: clsx(s.trigger, smallSize && s.smallSizeTrigger, className),
      item: clsx(s.item, smallSize && s.smallSizeItem),
    }

    return (
      <Label.Root className={s.root}>
        <Typography variant="body2" as="label" className={classes.label}>
          {label}
        </Typography>
        <RadixSelect.Root
          onValueChange={onChange}
          value={value}
          disabled={disabled}
          required={required}
        >
          <RadixSelect.Trigger className={classes.trigger} asChild ref={ref}>
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
                  <RadixSelect.Item value={o.value} key={o.value} className={classes.item}>
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
)
