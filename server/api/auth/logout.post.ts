export default defineEventHandler((event) => {
  const token = getCookie(event, SESSION_COOKIE)
  if (token) destroySession(token)
  deleteCookie(event, SESSION_COOKIE, { path: '/' })
  return { ok: true }
})
