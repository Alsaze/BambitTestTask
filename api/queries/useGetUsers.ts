import { useQuery } from '@tanstack/vue-query'
import { getUsers } from '~/api/endpoints'

export const useGetUsers = () => {
  return useQuery<Users>({
    queryKey: ['get-users'],
    queryFn: () => getUsers(),
    staleTime: Infinity,
  })
}
