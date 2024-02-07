import { Pagination } from '@/feature/decks-list/services/types.ts'

export type CardItem = {
  id: string
  deckId: string
  userId: string
  question: string
  answer: string
  shots: number
  answerImg: string
  questionImg: string
  questionVideo: string
  answerVideo: string
  created: string
  updated: string
  grade: number
}

export type GetCards = {
  items: CardItem[]
  pagination: Pagination
  maxCardsCount: number
}

export type GetCardsArgs = {
  id: string
  question?: string
  answer?: string
  currentPage?: number
  itemsPerPage?: number
  orderBy?: string | null
}

export type DeleteCardArgs = { id: string }

export type UpdateCardType = {
  id: string
  data: FormData
}

export type SaveGradeCardArgs = {
  cardId: string
  grade: number
}

export type Order = 'asc' | 'desc'
