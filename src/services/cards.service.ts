import { baseApi } from '@/app/providers/store/base-api.ts'
import {
  CardsResponseItems,
  CreateCardsArgs,
  GetCardsArgs,
  GetCardsResponse,
} from '@/services/cards.types.ts'

export const deckService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCards: builder.query<GetCardsResponse, GetCardsArgs>({
      query: ({ id }) => `v1/decks/${id}/cards`,
      providesTags: ['Cards'],
    }),
    createCard: builder.mutation<void, { deckId: string; data: CreateCardsArgs }>({
      query: ({ deckId, data }) => ({
        url: `v1/decks/${deckId}/cards`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Cards'],
    }),
    deleteCard: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `v1/cards/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cards'],
    }),
    updateCard: builder.mutation<CardsResponseItems, { deckId: string; data: CreateCardsArgs }>({
      query: ({ deckId, data }) => ({
        url: `v1/cards/${deckId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Cards'],
    }),
  }),
})

export const {
  useGetCardsQuery,
  useCreateCardMutation,
  useDeleteCardMutation,
  useUpdateCardMutation,
} = deckService
