import { Provider } from 'react-redux'

import { Router } from '@/app/providers/router'
import { store } from '@/app/providers/store/store.ts'

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  )
}

export default App
