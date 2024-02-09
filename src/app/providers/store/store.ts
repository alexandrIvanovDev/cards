import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { baseApi } from '@/app/providers/store/base-api.ts'
import { deckSlice } from '@/feature/deck/model/slice'
import { decksSlice } from '@/feature/decks-list/model/slice'
import { loadingSlice } from '@/feature/loading/model/slice'

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  decksList: decksSlice.reducer,
  deck: deckSlice.reducer,
  loading: loadingSlice.reducer,
})

const persistConfig = {
  key: 'cards',
  storage,
  blacklist: [baseApi.reducerPath, 'loading', 'auth'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat(baseApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
