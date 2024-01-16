import { baseApi } from '@/app/providers/store/base-api.ts'
import {
  CreateDeckArgs,
  DeckByIdArgs,
  DecksResponseItems,
  GetDecksArgs,
  GetDecksResponse,
} from '@/services/cards.types.ts'

export const deckService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getDecks: builder.query<GetDecksResponse, GetDecksArgs | void>({
      query: args => ({
        url: `v1/decks`,
        params: args ?? {},
      }),
      providesTags: ['Decks'],
    }),
    getDeckById: builder.query<DecksResponseItems, DeckByIdArgs>({
      query: ({ id }) => `v1/decks/${id}`,
    }),
    createDeck: builder.mutation<void, CreateDeckArgs>({
      query: (arg: any) => ({
        url: 'v1/decks',
        method: 'POST',
        body: arg,
      }),
      invalidatesTags: ['Decks'],
    }),
    deleteDeck: builder.mutation<DecksResponseItems, DeckByIdArgs>({
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
} = deckService
