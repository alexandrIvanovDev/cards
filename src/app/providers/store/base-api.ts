import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReauth } from '@/app/providers/store/base-query-with-reauth.ts'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Decks', 'Me', 'Cards'],
  endpoints: () => ({}),
})
