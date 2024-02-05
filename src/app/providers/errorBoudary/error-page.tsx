import { useTranslation } from 'react-i18next'

import s from './error-page.module.scss'

import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

export const ErrorPage = () => {
  const { t } = useTranslation()

  const reloadPage = () => {
    window.location.reload()
  }

  return (
    <div className={s.wrapper}>
      <Typography as="h2" variant="large">
        {t('Something went wrong')}
      </Typography>
      <Button onClick={reloadPage}>{t('Reload the page')}</Button>
    </div>
  )
}
