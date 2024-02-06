import { toast } from 'react-toastify'

export const notificationHandler = (e: any) => {
  console.log(e)
  if (e && e?.data) {
    if (e.data?.statusCode >= 400 && 'message' in e.data) {
      toast.error(e.data.message)
    } else if ('errorMessages' in e.data) {
      if (Array.isArray(e.data.errorMessages) && typeof e.data.errorMessages[0] === 'string') {
        toast.error(e.data?.errorMessages[0])
      }
    } else {
      toast.error('Some error occurred')
    }
  }
}
