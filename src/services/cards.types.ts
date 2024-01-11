export type GetDecksResponse = {
  maxCardsCount: number
  pagination: GetDecksResponsePagination
  items: GetDecksResponseItems[]
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
export type GetDecksResponseItems = {
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

export type GetDecksArgs = {
  minCardsCount?: number
  maxCardsCount?: number
  name?: string
  authorId?: string
  orderBy?: string
  currentPage?: number
  itemsPerPage?: number
}

export type GetDeckByIdArgs = {
  id: string
}

export type CreateDeckArgs = {
  name: string
  cover?: string
  isPrivate?: boolean
}
