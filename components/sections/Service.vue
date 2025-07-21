<template>
  <section id="service" class="flex flex-col w-full mt-5">
    <h2 class="font-bold text-2xl md:text-3xl mb-5">{{ t("sections.service.title") }}</h2>
    <h3 class="font-semibold text-xl md:text-2xl mb-4 text-neutral-500 dark:text-neutral-400">
      {{ t("sections.service.description") }}
    </h3>
    <div class="flex items-center gap-x-4 flex-wrap gap-y-2">
      <Button>{{ t("sections.service.btn.primary") }}</Button>
      <Button variant="secondary">{{ t("sections.service.btn.secondary") }}</Button>
    </div>
    <div class="w-full mt-5 mb-10 sm:mb-14 md:mb-16 lg:mb-24">
      <NuxtImg src="/dashboard.png" class="ml-5 w-11/12 -rotate-3 sm:-rotate-6 shadow-xl dark:shadow-neutral-700"/>
    </div>
  </section>
</template>

<script setup lang="ts">
const {t} = useI18n();
</script>
