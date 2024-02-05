import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

export const LangSwitcher = () => {
  const { i18n } = useTranslation()

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
  }

  return (
    <Button onClick={toggleLanguage} fullWidth variant={'secondary'}>
      <Typography variant={'subtitle2'} as={'span'}>
        {i18n.language}
      </Typography>
    </Button>
  )
}
