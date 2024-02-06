import { notificationHandler } from '@/common/utils/notification-handler.ts'

export const requestHandler = async (request: () => Promise<any>) => {
  try {
    await request()
  } catch (e) {
    notificationHandler(e)
  }
}
