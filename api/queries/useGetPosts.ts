import { useQuery } from '@tanstack/vue-query'
import { getPosts } from '~/api/endpoints'

export const useGetPosts = (search: MaybeRef<string>) => {
  return useQuery<Posts>({
    queryKey: ['get-posts', search],
    queryFn: () => getPosts(unref(search)),
    staleTime: Infinity,
  })
}
