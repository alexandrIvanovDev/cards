import { baseApi } from '@/app/providers/store/base-api.ts'
import {
  CardsResponseItems,
  CreateCardsArgs,
  GetCardsArgs,
  GetCardsResponse,
  SaveGradeCardArgs,
  UpdateCardType,
} from '@/services/cards.types.ts'

export const deckService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCards: builder.query<GetCardsResponse, GetCardsArgs>({
      query: ({ id, ...rest }) => ({
        url: `v1/decks/${id}/cards`,
        params: { ...rest },
      }),
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
    updateCard: builder.mutation<CardsResponseItems, UpdateCardType>({
      query: ({ id, data }) => ({
        url: `v1/cards/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Cards'],
    }),
    getRandomCard: builder.query<CardsResponseItems, { id: string }>({
      query: ({ id }) => ({
        url: `v1/decks/${id}/learn`,
        // params: { ...rest },
      }),
    }),
    // TODO
    rateCard: builder.mutation<CardsResponseItems, SaveGradeCardArgs & { id: string }>({
      query: ({ id, ...data }) => ({
        url: `v1/decks/${id}/learn`,
        method: 'POST',
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
  useGetRandomCardQuery,
  useRateCardMutation,
} = deckService
