import { useTranslation } from 'react-i18next'

import s from './decks-filter.module.scss'

import { DeleteIcon } from '@/assets/icons/Delete.tsx'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Tabs, TabType } from '@/components/ui/tabs'
import { TextField } from '@/components/ui/textfield'
import { Typography } from '@/components/ui/typography'

type Props = {
  userId: string
  tabsValue: string
  setTabValue: (value: string) => void
  sliderValue: Array<number>
  setCardsCount: (value: Array<number>) => void
  maxCardsCount: number
  search: string
  setSearchTerm: (value: string) => void
}

export const DecksFilter = (props: Props) => {
  const {
    tabsValue,
    setCardsCount,
    sliderValue,
    setTabValue,
    maxCardsCount,
    userId,
    search,
    setSearchTerm,
  } = props

  const { t } = useTranslation()

  const clearSearchValue = () => {
    setSearchTerm('')
  }

  const clearFilter = () => {
    setSearchTerm('')
    setCardsCount([0, maxCardsCount])
    setTabValue('')
  }

  const tabs: Array<TabType> = [
    { value: userId, text: t('My Cards') },
    { value: '', text: t('All Cards') },
  ]

  return (
    <div className={s.settingsWrapper}>
      <TextField
        type="search"
        placeholder={t('Input search')}
        className={s.input}
        value={search}
        onChange={e => setSearchTerm(e.currentTarget.value)}
        clearValue={clearSearchValue}
      />
      <Tabs
        tabs={tabs}
        value={tabsValue}
        onValueChange={setTabValue}
        label={t('Show packs cards')}
      />
      <Slider
        min={0}
        max={maxCardsCount}
        value={sliderValue}
        onValueChange={setCardsCount}
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
