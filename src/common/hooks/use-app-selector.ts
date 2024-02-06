import { TypedUseSelectorHook, useSelector } from 'react-redux'

import { RootState } from '@/app/providers/store/store.ts'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
