import { defineEventHandler, getQuery } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    const { search } = getQuery(event)
    const apiUrl = import.meta.env.VITE_MY_API_BASE_URL!

    return await $fetch<Posts>(`${apiUrl}/posts?title_like=${search}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': 'ru-RU',
      },
    })
  }
  catch (error) {
    return sendError(event, createError({
      statusCode: 500,
      statusMessage: `Не удалось получить посты: ${error}`,
    }))
  }
})
