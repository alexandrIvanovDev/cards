import { Suspense } from 'react'

import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import { Router } from '@/app/providers/router'
import { store } from '@/app/providers/store/store.ts'
import { ThemeProvider } from '@/app/providers/theme-provider/ui'
import { ProgressBar } from '@/components/ui/progress-bar'

const persistor = persistStore(store)

function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={<ProgressBar />}>
        <PersistGate loading={<ProgressBar />} persistor={persistor}>
          <ThemeProvider>
            <Router />
          </ThemeProvider>
        </PersistGate>
      </Suspense>
    </Provider>
  )
}

export default App
