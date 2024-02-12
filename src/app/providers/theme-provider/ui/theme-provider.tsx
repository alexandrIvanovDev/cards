import { ReactNode, useMemo, useState } from 'react'

import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from '../lib/theme-context.tsx'

type Props = { children: ReactNode }

export const ThemeProvider = ({ children }: Props) => {
  // const isDarkTheme = useThemeDetector()
  // const userTheme = isDarkTheme ? Theme.DARK : Theme.LIGHT
  // userTheme instead Theme.Dark
  const defaultTheme = (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.DARK

  const [theme, setTheme] = useState<Theme>(defaultTheme)

  const defaultProps = useMemo(() => ({ theme, setTheme }), [theme])

  return <ThemeContext.Provider value={defaultProps}>{children}</ThemeContext.Provider>
}
