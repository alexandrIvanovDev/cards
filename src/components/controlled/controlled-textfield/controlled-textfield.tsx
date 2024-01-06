import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { TextField, TextFieldProps } from '@/components/ui/textfield'

type Props<T extends FieldValues> = UseControllerProps<T> &
  Omit<TextFieldProps, 'value' | 'onChange'>

export const ControlledTextField = <T extends FieldValues>(props: Props<T>) => {
  const { name, control, disabled, rules, shouldUnregister, defaultValue, ...rest } = props

  const {
    field: { value, onChange, ...field },
  } = useController({
    name,
    defaultValue,
    control,
    disabled,
    shouldUnregister,
    rules,
  })

  return <TextField {...rest} {...field} value={value} onChange={onChange} />
}
