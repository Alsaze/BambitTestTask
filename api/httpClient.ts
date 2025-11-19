import { useToast } from '#imports'

const showToast = (description: string) => {
  if (!import.meta.client)
    return

  const toast = useToast()

  toast.add({
    title: 'Uh oh! Something went wrong.',
    description,
  })
}

export const httpClient = $fetch.create({
  onResponseError({ request, response }) {
    const message = response?._data?.statusMessage ?? 'Something went wrong'

    showToast(message)
  },
})
