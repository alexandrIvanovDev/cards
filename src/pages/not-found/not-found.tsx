import { Link } from 'react-router-dom'

import s from './not-found.module.scss'

import { routePaths } from '@/app/providers/router'
import { NotFoundIcon } from '@/assets/icons/NotFound.tsx'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

export const NotFound = () => {
  return (
    <div className={s.content}>
      <NotFoundIcon />
      <Typography variant={'body1'}>Sorry! Page not found!</Typography>
      <Button as={Link} to={routePaths.main}>
        <Typography variant={'subtitle2'}>Back to home page</Typography>
      </Button>
    </div>
  )
}
