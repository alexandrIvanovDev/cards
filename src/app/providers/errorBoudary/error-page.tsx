import s from './error-page.module.scss'

import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

export const ErrorPage = () => {
  const reloadPage = () => {
    window.location.reload()
  }

  return (
    <div className={s.wrapper}>
      <Typography as="h2" variant="large">
        Something went wrong
      </Typography>
      <Button onClick={reloadPage}>Reload the page</Button>
    </div>
  )
}
