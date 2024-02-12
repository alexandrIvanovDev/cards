import '@/app/styles/index.scss'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'
import './app/providers/i18n/i18n.ts'

import { createRoot } from 'react-dom/client'

import App from '@/app/App.tsx'

createRoot(document.getElementById('root')!).render(<App />)
