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
}

export type GetDecksArgs = {
  minCardsCount?: number
  maxCardsCount?: number
  name?: string
  authorId?: string
  orderBy?: string
  currentPage?: number
  itemsPerPage?: number
}

export type DeckByIdArgs = {
  id: string
}

export type CreateDeckArgs = {
  name: string
  cover?: string
  isPrivate?: boolean
}

export type GetCardsResponse = {
  items: CardsResponseItems[]
  pagination: GetDecksResponsePagination
  maxCardsCount: number
}

export type GetCardsArgs = { id: string }

export type DeleteCardsArgs = { id: string }

export type CreateCardsArgs = {
  question: string
  answer: string
  questionImg?: string
  answerImg?: string
  questionVideo?: string
  answerVideo?: string
}
