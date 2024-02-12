import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import * as Switch from '@radix-ui/react-switch'
import { clsx } from 'clsx'
import { useTranslation } from 'react-i18next'

import s from './theme-switcher.module.scss'

import { Theme } from '@/app/providers/theme-provider/lib'
import { useTheme } from '@/common/hooks/use-theme.ts'
import { Typography } from '@/components/ui/typography'

type Props = { className?: string }

export const ThemeSwitcher = ({ className }: Props) => {
  const { theme, toggleTheme } = useTheme()
  const { t } = useTranslation()

  return (
    <div className={clsx(s.root, className)}>
      {theme === Theme.DARK ? <SunIcon className={s.icon} /> : <MoonIcon className={s.icon} />}
      <Typography variant={'body2'}>{t('Change theme')}</Typography>
      <Switch.Root className={s.switchRoot} onClick={toggleTheme} checked={theme === 'dark'}>
        <Switch.Thumb className={s.switchThumb} />
      </Switch.Root>
    </div>
  )
}
