import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import { useTheme } from '@/common/hooks/use-theme.ts'

export const Toast = () => {
  const { theme } = useTheme()

  return (
    <ToastContainer
      position="bottom-left"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={theme}
    />
  )
}
