import { httpClient } from '../httpClient'

export const getUsers = () =>
  httpClient<Users>('/api/users')
