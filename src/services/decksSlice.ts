import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type InitialState = {
  pagination: {
    currentPage: number
    pageSize: number
  }
  filter: {
    searchTerm: string
    tabValue: string
    cardsCount: Array<number>
  }
}

export const decksSlice = createSlice({
  name: 'filter',
  initialState: {
    pagination: {
      currentPage: 1,
      pageSize: 10,
    },
    filter: {
      searchTerm: '',
      tabValue: 'all',
      cardsCount: [0, 10],
    },
  } as InitialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.filter.searchTerm = action.payload
    },
    setTabValue: (state, action: PayloadAction<string>) => {
      state.filter.tabValue = action.payload
    },
    setCardsCount: (state, action: PayloadAction<Array<number>>) => {
      state.filter.cardsCount = action.payload
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pagination.pageSize = action.payload
    },
  },
})

export const { setSearchTerm, setCardsCount, setTabValue, setCurrentPage, setPageSize } =
  decksSlice.actions
