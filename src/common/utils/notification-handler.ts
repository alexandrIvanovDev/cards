import { toast } from 'react-toastify'

export const notificationHandler = (res: any) => {
  console.log(res)
  if (res?.data) {
    console.log(res?.data?.message)
    toast.error(res?.data?.message)
  }
}
