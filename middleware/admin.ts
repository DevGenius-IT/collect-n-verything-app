export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = authStore();

  if (!auth.isAdmin()) {
    const localePath = useLocalePath();
    const router = useRouter();

    if (!auth.state.user || !auth.state.token) {
      return await router.replace(localePath('/auth'));
    }

    return await router.replace(localePath('/'));
  }
})
