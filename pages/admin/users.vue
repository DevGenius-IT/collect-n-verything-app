<template>
  <div
    :class="
      cn(
        'grid transition-all duration-300 ease-in-out flex-1 items-start gap-4 p-4 sm:pl-60 sm:px-6 sm:py-0 md:gap-8',
        {
          'sm:pl-60': !useDesign.state.toggleRetract,
          'sm:pl-24': useDesign.state.toggleRetract,
        },
      )
    "
  >
    <div class="w-full flex justify-center">
      <h1 class="text-2xl">Users</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { cn } from '~/lib/utils';
const { t } = useI18n()

definePageMeta({
  layout: "admin",
  title: "users.seo.title",
});

const useDesign = designStore();
</script>
