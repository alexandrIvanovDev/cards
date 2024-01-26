export type GetDecksResponse = {
  maxCardsCount: number
  pagination: GetDecksResponsePagination
  items: DecksResponseItems[]
}
export type GetDecksResponsePagination = {
  totalPages: number
  currentPage: number
  itemsPerPage: number
  totalItems: number
}
export type GetDecksResponseItemsAuthor = {
  id: string
  name: string
}
export type DecksResponseItems = {
  id: string
  userId: string
  name: string
  isPrivate: boolean
  shots: number
  cover: string | null
  isDeleted?: boolean | null
  isBlocked?: boolean | null
  created: string
  updated: string
  cardsCount: number
  author: GetDecksResponseItemsAuthor
}

export type CardsResponseItems = {
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

export type GetDecksArgs = {
  minCardsCount?: number
  maxCardsCount?: number
  name?: string
  authorId?: string
  orderBy?: string | null
  currentPage?: number
  itemsPerPage?: number
}

export type DeckByIdArgs = {
  id: string
}

export type DeckArgs = {
  name: string
  cover?: string
  isPrivate?: boolean
}

export type GetCardsResponse = {
  items: CardsResponseItems[]
  pagination: GetDecksResponsePagination
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

export type DeleteCardsArgs = { id: string }

export type UpdateCardType = {
  id: string
  data: CreateCardsArgs
}

export type CreateCardsArgs = {
  question: string
  answer: string
  questionImg?: string
  answerImg?: string
  questionVideo?: string
  answerVideo?: string
}

export type UpdateDeck = {
  id: string
  data: DeckArgs
}
export type SaveGradeCardArgs = {
  cardId: string
  grade: number
}

export type Order = 'asc' | 'desc'
