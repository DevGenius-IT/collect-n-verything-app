<template>
  <div class="mt-5 w-full">
    <h1 class="text-3xl font-bold mb-5 md:mb-8">{{ t("session.cancel.title") }}</h1>
    <p class="text-balance text-muted-foreground">
      {{ t("session.cancel.description") }}
    </p>
  </div>
</template>

<script setup lang="ts">
const {t} = useI18n();

definePageMeta({
  layout: "default",
  title: "session.cancel.seo.title",
});
</script>
