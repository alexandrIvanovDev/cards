import { useDispatch } from 'react-redux'

import { AppDispatch } from '@/app/providers/store/store.ts'

export const useAppDispatch: () => AppDispatch = useDispatch
