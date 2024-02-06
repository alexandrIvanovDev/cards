import { useAppDispatch } from '@/common/hooks/use-app-dispatch.ts'
import { useAppSelector } from '@/common/hooks/use-app-selector.ts'
import {
  setCurrentPage as onChangeCurrentPage,
  setPageSize as onChangePageSize,
} from '@/feature/decks-list/model/slice'

export const usePagination = () => {
  const { currentPage, pageSize } = useAppSelector(state => state.decks.pagination)

  const dispatch = useAppDispatch()

  const setCurrentPage = (page: number) => {
    dispatch(onChangeCurrentPage(page))
  }

  const setPageSize = (pageSize: number) => {
    dispatch(onChangePageSize(pageSize))
  }

  return { currentPage, pageSize, setCurrentPage, setPageSize }
}
