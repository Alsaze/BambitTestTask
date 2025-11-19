import { httpClient } from '../httpClient'

export const getPosts = (search: string) =>
  httpClient<Posts>('/api/posts', {
    method: 'GET',
    query: { search },
  })
