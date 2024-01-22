import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type InitialState = {
  pagination: {
    currentPage: number
    pageSize: number
  }
  searchTerm: string
}

export const cardsSlice = createSlice({
  name: 'cards',
  initialState: {
    pagination: {
      currentPage: 1,
      pageSize: 5,
    },
    searchTerm: '',
  } as InitialState,
  reducers: {
    setCardsSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pagination.pageSize = action.payload
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload
    },
  },
})

export const { setCardsSearchTerm, setPageSize, setCurrentPage } = cardsSlice.actions
