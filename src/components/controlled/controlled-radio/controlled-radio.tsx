import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { RadioGroup, RadioGroupProps } from '@/components/ui/radio-group'

type Props<T extends FieldValues> = UseControllerProps<T> &
  Omit<RadioGroupProps, 'value' | 'onValueChange'>

export const ControlledRadio = <T extends FieldValues>(props: Props<T>) => {
  const { radioButtons, name, control, disabled, rules, shouldUnregister, defaultValue, ...rest } =
    props

  const {
    field: { value, onChange, ...field },
  } = useController({
    control,
    name,
    disabled,
    shouldUnregister,
    rules,
    defaultValue,
  })

  return (
    <RadioGroup
      {...rest}
      {...field}
      radioButtons={radioButtons}
      value={value}
      onValueChange={onChange}
    />
  )
}
