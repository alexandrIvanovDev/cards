import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit'

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: { isLoading: false },
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(isPending, state => {
      state.isLoading = true
    })
    builder.addMatcher(isFulfilled, state => {
      state.isLoading = false
    })
    builder.addMatcher(isRejected, state => {
      state.isLoading = false
    })
  },
})
