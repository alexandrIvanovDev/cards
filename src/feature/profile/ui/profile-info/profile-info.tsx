import { useTranslation } from 'react-i18next'

import s from './profile-info.module.scss'

import { EditIcon } from '@/assets/icons/Edit.tsx'
import { LogoutIcon } from '@/assets/icons/Logout.tsx'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { User } from '@/feature/auth/auth.types.ts'

type ProfileInfoProps = {
  user: Pick<User, 'name' | 'email'>
  changeName: () => void
  logout: () => void
}

export const ProfileInfo = ({ changeName, user, logout }: ProfileInfoProps) => {
  const { t } = useTranslation()

  return (
    <div className={s.information}>
      <Typography variant="h1" as="h3" className={s.name}>
        {user.name} <EditIcon className={s.editIcon} onClick={changeName} />
      </Typography>
      <Typography variant="body2" className={s.email}>
        {user.email}
      </Typography>
      <Button variant="secondary" onClick={logout}>
        <LogoutIcon className={s.logoutIcon} />
        <Typography variant={'subtitle2'}>{t('Logout')}</Typography>
      </Button>
    </div>
  )
}
