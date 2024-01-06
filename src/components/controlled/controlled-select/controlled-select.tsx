import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { Select, SelectProps } from '@/components/ui/select'

type Props<T extends FieldValues> = UseControllerProps<T> & Omit<SelectProps, 'value' | 'onChange'>

export const ControlledSelect = <T extends FieldValues>(props: Props<T>) => {
  const { name, control, disabled, shouldUnregister, options, rules, defaultValue, ...rest } = props

  const {
    field: { value, onChange, ...field },
  } = useController({
    name,
    control,
    disabled,
    shouldUnregister,
    rules,
    defaultValue,
  })

  return <Select {...rest} {...field} options={options} value={value} onChange={onChange} />
}
