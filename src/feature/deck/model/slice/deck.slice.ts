import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type InitialState = {
  pagination: {
    currentPage: number
    pageSize: number
  }
  searchTerm: string
}

export const deckSlice = createSlice({
  name: 'deck',
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
    setDefaultState: state => {
      state.searchTerm = ''
      state.pagination.currentPage = 1
      state.pagination.pageSize = 5
    },
  },
})

export const { setCardsSearchTerm, setPageSize, setCurrentPage, setDefaultState } =
  deckSlice.actions
