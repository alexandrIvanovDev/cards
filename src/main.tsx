import '@/app/styles/index.scss'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'

import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import App from '@/app/App.tsx'
import { store } from '@/app/providers/store/store.ts'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
)
