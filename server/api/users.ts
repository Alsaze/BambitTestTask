import { createError, defineEventHandler, sendError } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    const apiUrl = import.meta.env.VITE_MY_API_BASE_URL!

    return await $fetch<Users>(`${apiUrl}/users`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': 'ru-RU',
      },
    })
  }
  catch (error) {
    return sendError(event, createError({
      statusCode: 500,
      statusMessage: `Не удалось получить пользователей: ${error}`,
    }))
  }
})
