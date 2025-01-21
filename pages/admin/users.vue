<template>
  <div class="w-full flex justify-center">
    <h1 class="text-2xl">Users</h1>
  </div>
</template>

<script setup lang="ts">
import { cn } from "~/lib/utils";
const { t } = useI18n();

definePageMeta({
  layout: "admin",
  title: "users.seo.title",
});

const useDesign = designStore();
</script>
