<template>
  <main class="flex min-h-screen w-full flex-col bg-muted/40">
    <slot />
  </main>
</template>

<script lang="ts" setup>

import { useLocaleHead } from "#i18n"

const { t } = useI18n();
const route = useRoute();
const head = useLocaleHead();
const title = computed(() => t((route.meta.title as string) ?? "app.title"));

useHead({
  title,
  meta: head.value.meta,
  link: head.value.link,
  htmlAttrs: {
    lang: head.value.htmlAttrs?.lang,
    dir: head.value.htmlAttrs?.dir,
  },
});
</script>
