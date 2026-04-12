export default defineEventHandler((event) => {
  const path = getRequestURL(event).pathname
  if (!path.startsWith('/api/admin')) return

  const token = getCookie(event, SESSION_COOKIE)
  if (!isValidSession(token)) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized — please log in' })
  }
})
