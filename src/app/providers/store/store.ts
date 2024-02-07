import { configureStore } from '@reduxjs/toolkit'

import { baseApi } from '@/app/providers/store/base-api.ts'
import { deckSlice } from '@/feature/deck/model/slice/deck.slice.ts'
import { decksSlice } from '@/feature/decks-list/model/slice'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    decksList: decksSlice.reducer,
    deck: deckSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
