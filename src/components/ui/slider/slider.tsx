import { FC } from 'react'

import * as RadixSlider from '@radix-ui/react-slider'
import { clsx } from 'clsx'

import s from './slider.module.scss'

type Props = {
  min: number
  max: number
  onValueChange: (value: Array<number>) => void
  step?: number
  minStepsBetweenThumbs?: number
  defaultValue?: Array<number>
  className?: string
}

export const Slider: FC<Props> = props => {
  const {
    min,
    max,
    step = 1,
    minStepsBetweenThumbs = 1,
    className,
    defaultValue = [min, max],
    onValueChange,
  } = props

  const classes = {
    wrapper: clsx(s.wrapper, className),
  }

  return (
    <div className={classes.wrapper}>
      <div className={s.count}>{defaultValue[0]}</div>
      <RadixSlider.Root
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        min={min}
        max={max}
        step={step}
        minStepsBetweenThumbs={minStepsBetweenThumbs}
        className={s.root}
      >
        <RadixSlider.Track className={s.track}>
          <RadixSlider.Range className={s.range} />
        </RadixSlider.Track>
        <RadixSlider.Thumb className={s.thumb} />
        <RadixSlider.Thumb className={s.thumb} />
      </RadixSlider.Root>
      <div className={s.count}>{defaultValue[1]}</div>
    </div>
  )
}
