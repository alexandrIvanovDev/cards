import { MoonIcon, SunIcon } from '@radix-ui/react-icons'

import s from './theme-switcher.module.scss'

import { Theme } from '@/app/providers/theme-provider/lib'
import { useTheme } from '@/common/hooks/use-theme.ts'
import { Button } from '@/components/ui/button'

type Props = { className?: string }

export const ThemeSwitcher = ({ className }: Props) => {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button onClick={toggleTheme} className={className}>
      {theme === Theme.DARK ? <SunIcon className={s.icon} /> : <MoonIcon className={s.icon} />}
    </Button>
  )
}
