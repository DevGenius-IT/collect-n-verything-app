<template>
  <div class="w-full flex justify-center">
    <h1 class="text-2xl">{{ t("dashboard.welcome") }}</h1>
  </div>
</template>

<script setup lang="ts">

const { t } = useI18n();

definePageMeta({
  layout: "admin",
  title: "dashboard.seo.title",
  middleware: ["admin"],
});


</script>
