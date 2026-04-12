export default defineEventHandler(async (event) => {
  const { password } = await readBody<{ password: string }>(event)
  const config = useRuntimeConfig()

  if (!checkPassword(password, config.adminPassword)) {
    throw createError({ statusCode: 401, statusMessage: 'Incorrect password' })
  }

  const token = createSession()
  setCookie(event, SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24h
    path: '/',
  })

  return { ok: true }
})
