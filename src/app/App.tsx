import { Suspense } from 'react'

import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import { Router } from '@/app/providers/router'
import { store } from '@/app/providers/store/store.ts'
import { ProgressBar } from '@/components/ui/progress-bar'

const persistor = persistStore(store)

function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={'Loading...'}>
        <PersistGate loading={<ProgressBar />} persistor={persistor}>
          <Router />
        </PersistGate>
      </Suspense>
    </Provider>
  )
}

export default App
