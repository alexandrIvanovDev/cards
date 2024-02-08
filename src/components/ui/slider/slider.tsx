import { ChangeEvent, FC, KeyboardEvent } from 'react'

import * as RadixSlider from '@radix-ui/react-slider'
import { clsx } from 'clsx'

import s from './slider.module.scss'

import { TextField } from '@/components/ui/textfield'
import { Typography } from '@/components/ui/typography'

type Props = {
  min: number
  max: number
  value: Array<number>
  onValueChange: (value: Array<number>) => void
  step?: number
  minStepsBetweenThumbs?: number
  defaultValue?: Array<number>
  className?: string
  label?: string
}

export const Slider: FC<Props> = props => {
  const {
    min,
    max,
    value,
    onValueChange,
    step = 1,
    minStepsBetweenThumbs = 1,
    className,
    defaultValue = [min, max],
    label,
  } = props

  const onChangeMinValue = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = +e.currentTarget.value

    if (newValue < min) {
      return newValue === min
    }
    if (newValue > value[1]) {
      return newValue === newValue - 1
    }
    if (newValue === value[1]) {
      return newValue === newValue - 1
    }

    onValueChange([newValue, value[1]])
  }

  const onChangeMaxValue = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = +e.currentTarget.value

    if (newValue > max) {
      return newValue === max
    }
    if (newValue === value[0]) {
      return newValue === newValue + 1
    }

    onValueChange([value[0], newValue])
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Backspace') {
      e.preventDefault()
      onValueChange([value[0], value[0] + 1])
    }
  }

  return (
    <div className={clsx(s.wrapper, className)}>
      {label && (
        <Typography variant={'body2'} as={'label'} className={s.label}>
          {label}
        </Typography>
      )}
      <TextField type={'number'} className={s.count} value={value[0]} onChange={onChangeMinValue} />
      <RadixSlider.Root
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        min={min}
        max={max}
        step={step}
        minStepsBetweenThumbs={minStepsBetweenThumbs}
        className={s.root}
        value={value}
      >
        <RadixSlider.Track className={s.track}>
          <RadixSlider.Range className={s.range} />
        </RadixSlider.Track>
        <RadixSlider.Thumb className={s.thumb} />
        <RadixSlider.Thumb className={s.thumb} />
      </RadixSlider.Root>
      <TextField
        type={'number'}
        className={s.count}
        value={value[1]}
        onChange={onChangeMaxValue}
        onKeyDown={onKeyPressHandler}
      />
    </div>
  )
}
