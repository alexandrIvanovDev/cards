export const requestHandler = async (request: () => Promise<any>) => {
  try {
    await request()
  } catch (e) {
    console.warn(e)
  }
}
