const getToken = (): string | null => {
  return localStorage.getItem('token')
}

const storeToken = (token: string): void => {
  localStorage.setItem('token', token)
}

export { getToken, storeToken }
