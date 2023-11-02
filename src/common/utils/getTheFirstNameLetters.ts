export const getTheFirstNameLetters = (userName: string) => {
  return userName
    .split(' ')
    .map(w => w[0].toUpperCase())
    .join('')
}
