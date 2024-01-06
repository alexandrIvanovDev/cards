import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { Checkbox, CheckboxProps } from '@/components/ui/checkbox'

type Props<T extends FieldValues> = UseControllerProps<T> &
  Omit<CheckboxProps, 'checked' | 'onChange'>

export const ControlledCheckbox = <T extends FieldValues>(props: Props<T>) => {
  const { control, name, defaultValue, disabled, shouldUnregister, rules, ...rest } = props

  const {
    field: { value, onChange, ...field },
  } = useController({
    control,
    name,
    defaultValue,
    disabled,
    shouldUnregister,
    rules,
  })

  return <Checkbox {...rest} {...field} checked={value} onChange={onChange} disabled={disabled} />
}
