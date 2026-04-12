export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith('/admin') || to.path === '/admin') return
  try {
    const { authenticated } = await $fetch<{ authenticated: boolean }>('/api/auth/check')
    if (!authenticated) return navigateTo('/admin')
  } catch {
    return navigateTo('/admin')
  }
})
