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
    { value: userId, text: t('My') },
    { value: '', text: t('All') },
  ]

  return (
    <div className={s.settingsWrapper}>
      <TextField
        type="search"
        placeholder={t('Search')}
        className={s.input}
        value={search}
        onChange={e => setSearchTerm(e.currentTarget.value)}
        clearValue={clearSearchValue}
      />
      <Tabs
        tabs={tabs}
        value={tabsValue}
        onValueChange={setTabValue}
        label={t('Show decks cards')}
        className={s.tabs}
      />
      <Slider
        min={0}
        max={maxCardsCount}
        value={[sliderValue[0], sliderValue[1] ?? maxCardsCount]}
        onValueChange={setCardsCount}
        label={t('Number of cards')}
        className={s.slider}
      />
      <Button variant="secondary" onClick={clearFilter} className={s.btn}>
        <DeleteIcon className={s.deleteIcon} />
        <Typography variant={'subtitle2'} as={'span'}>
          {t('Clear filter')}
        </Typography>
      </Button>
    </div>
  )
}
