import { baseApi } from '@/app/providers/store/base-api.ts'
import {
  Deck,
  DeckByIdArgs,
  GetDecks,
  GetDecksArgs,
  UpdateDeck,
} from '@/feature/decks-list/services'

export const deckService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getDecks: builder.query<GetDecks, GetDecksArgs | void>({
      query: args => ({
        url: `v1/decks`,
        params: args ?? {},
      }),
      providesTags: ['Decks'],
    }),
    getDeckById: builder.query<Deck, DeckByIdArgs>({
      query: ({ id }) => ({
        url: `v1/decks/${id}`,
      }),
      providesTags: ['Decks'],
    }),
    createDeck: builder.mutation<void, FormData>({
      query: (arg: any) => ({
        url: 'v1/decks',
        method: 'POST',
        body: arg,
      }),
      invalidatesTags: ['Decks'],
    }),
    updateDeck: builder.mutation<Deck, UpdateDeck>({
      query: ({ id, data }) => ({
        url: `v1/decks/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Decks'],
    }),
    deleteDeck: builder.mutation<Deck, DeckByIdArgs>({
      query: ({ id }) => ({
        url: `v1/decks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Decks'],
    }),
  }),
})

export const {
  useGetDecksQuery,
  useGetDeckByIdQuery,
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useUpdateDeckMutation,
} = deckService
