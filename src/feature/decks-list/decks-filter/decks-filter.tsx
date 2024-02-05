import { ChangeEvent } from 'react'

import { useTranslation } from 'react-i18next'

import s from './decks-filter.module.scss'

import { DeleteIcon } from '@/assets/icons/Delete.tsx'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Tabs } from '@/components/ui/tabs'
import { TextField } from '@/components/ui/textfield'
import { Typography } from '@/components/ui/typography'

type Props = {
  userId: string
  tabsValue: string
  setTabsValue: (value: string) => void
  sliderValue: Array<number>
  onChangeSliderValue: (value: Array<number>) => void
  maxCardsCount: number
  search: string
  setSearch: (value: string) => void
  clearFilter: () => void
}

export const DecksFilter = (props: Props) => {
  const {
    tabsValue,
    onChangeSliderValue,
    sliderValue,
    setTabsValue,
    maxCardsCount,
    userId,
    search,
    setSearch,
    clearFilter,
  } = props

  const { t } = useTranslation()

  // const dispatch = useDispatch()

  // const onTabValueChange = (value: string) => {
  //   setTabsValue(value)
  //   dispatch(setTabValue(value))
  // }

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value)
  }

  return (
    <div className={s.settingsWrapper}>
      <TextField
        type="search"
        placeholder={t('Input search')}
        className={s.input}
        value={search}
        onChange={onChangeSearch}
      />
      <Tabs
        tabs={[
          { value: userId, text: t('My Cards') },
          { value: '', text: t('All Cards') },
        ]}
        value={tabsValue}
        onValueChange={setTabsValue}
        label={t('Show packs cards')}
      />
      <Slider
        min={0}
        max={maxCardsCount}
        value={sliderValue}
        onValueChange={onChangeSliderValue}
        label={t('Number of cards')}
      />
      <Button variant="secondary" onClick={clearFilter}>
        <DeleteIcon className={s.deleteIcon} />
        <Typography variant={'subtitle2'} as={'span'}>
          {t('Clear filter')}
        </Typography>
      </Button>
    </div>
  )
}
