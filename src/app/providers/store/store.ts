import { configureStore } from '@reduxjs/toolkit'

import { baseApi } from '@/app/providers/store/base-api.ts'
import { authSlice } from '@/feature/auth/model/slice'
import { deckSlice } from '@/feature/deck/model/slice'
import { decksSlice } from '@/feature/decks-list/model/slice'
import { loadingSlice } from '@/feature/loading/model/slice'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    decksList: decksSlice.reducer,
    deck: deckSlice.reducer,
    loading: loadingSlice.reducer,
    auth: authSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
