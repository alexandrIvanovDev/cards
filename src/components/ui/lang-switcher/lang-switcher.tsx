import { useTranslation } from 'react-i18next'

import s from './lang-switcher.module.scss'

import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

export const LangSwitcher = () => {
  const { t, i18n } = useTranslation()

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
  }

  return (
    <div className={s.content}>
      <Typography variant={'subtitle2'} as={'div'}>
        {t('Language')}
      </Typography>
      <Button onClick={toggleLanguage} variant={'secondary'}>
        <Typography variant={'subtitle2'} as={'span'}>
          {i18n.language}
        </Typography>
      </Button>
    </div>
  )
}
