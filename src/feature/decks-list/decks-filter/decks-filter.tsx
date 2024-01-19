import { FC } from 'react'

import s from './decks-filter.module.scss'

import { DeleteIcon } from '@/assets/icons/Delete.tsx'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Tabs } from '@/components/ui/tabs'
import { TextField } from '@/components/ui/textfield'

type Props = {
  tabsValue: string
  setTabsValue: (value: string) => void
  sliderValue: Array<number>
  onChangeSliderValue: (value: Array<number>) => void
  maxCardsCount: number
}

export const DecksFilter: FC<Props> = props => {
  const { tabsValue, onChangeSliderValue, sliderValue, setTabsValue, maxCardsCount } = props

  const clearFilter = () => {}

  return (
    <div className={s.settingsWrapper}>
      <TextField type="search" placeholder="Input search" className={s.input} />
      <Tabs
        tabs={[
          { value: 'my', text: 'My Cards' },
          { value: 'all', text: 'All Cards' },
        ]}
        value={tabsValue}
        onValueChange={setTabsValue}
        label="Show packs cards"
      />
      <Slider
        min={0}
        max={maxCardsCount}
        value={sliderValue}
        onValueChange={onChangeSliderValue}
        label="Number of cards"
      />
      <Button variant="secondary" onClick={clearFilter}>
        <DeleteIcon className={s.deleteIcon} /> Clear filter
      </Button>
    </div>
  )
}
