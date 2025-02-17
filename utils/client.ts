export const localStorageIsAvailable = () => {
  return typeof window !== 'undefined' && window.localStorage
}