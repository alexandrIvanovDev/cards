import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type InitialState = {
  searchTerm: string
}

export const cardsSlice = createSlice({
  name: 'cards',
  initialState: {
    searchTerm: '',
  } as InitialState,
  reducers: {
    setCardsSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
    },
  },
})

export const { setCardsSearchTerm } = cardsSlice.actions
