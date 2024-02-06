import { configureStore } from '@reduxjs/toolkit'

import { baseApi } from '@/app/providers/store/base-api.ts'
import { decksSlice } from '@/feature/decks-list/model/slice'
import { cardsSlice } from '@/services/cardsSlice.ts'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    decks: decksSlice.reducer,
    cards: cardsSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
