import { Suspense } from 'react'

import { Provider } from 'react-redux'

import { Router } from '@/app/providers/router'
import { store } from '@/app/providers/store/store.ts'
import { ProgressBar } from '@/components/ui/progress-bar'
import { Toast } from '@/components/ui/toast'

function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={<ProgressBar />}>
        <Router />
      </Suspense>
      <Toast />
    </Provider>
  )
}

export default App
