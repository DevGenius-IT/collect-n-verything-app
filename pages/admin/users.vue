<template>
  <div class="w-full flex justify-center">
    <h1 class="text-2xl">{{ t("users.title") }}</h1>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();

definePageMeta({
  layout: "admin",
  title: "users.seo.title",
  middleware: ["admin"],
});
</script>
