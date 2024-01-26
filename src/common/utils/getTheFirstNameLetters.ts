export const getTheFirstNameLetters = (userName: string) => {
  return userName
    .split(' ')
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('')
}
