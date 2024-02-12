import { useTranslation } from 'react-i18next'

import s from './lang-switcher.module.scss'

import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

type Props = { className?: string }

export const LangSwitcher = ({ className }: Props) => {
  const { i18n } = useTranslation()

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
  }

  return (
    <Button onClick={toggleLanguage} variant={'secondary'} className={className}>
      <Typography variant={'subtitle2'} as={'span'} className={s.text}>
        {i18n.language === 'ru' ? 'En' : 'Ru'}
      </Typography>
    </Button>
  )
}
