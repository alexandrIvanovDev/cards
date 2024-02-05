import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import s from './not-found.module.scss'

import { routePaths } from '@/app/providers/router'
import { NotFoundIcon } from '@/assets/icons/NotFound.tsx'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

export const NotFound = () => {
  const { t } = useTranslation()

  return (
    <div className={s.content}>
      <NotFoundIcon />
      <Typography variant={'body1'}>{t('Sorry! Page not found!')}</Typography>
      <Button as={Link} to={routePaths.main}>
        <Typography variant={'subtitle2'}>{t('Back to home page')}</Typography>
      </Button>
    </div>
  )
}
