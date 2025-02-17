export default defineNuxtRouteMiddleware((to, from) => {
  const auth = authStore()

  if (!auth.state.user && !auth.state.token && auth.isAdmin()) {
    return navigateTo('/auth')
  }
})
