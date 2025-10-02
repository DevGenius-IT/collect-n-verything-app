<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-5">
    <h1 class="text-2xl font-bold mb-6">{{ t('privacy-policy.title') }}</h1>
    <p class="mb-8 text-gray-700 dark:text-gray-300">{{ t('privacy-policy.intro') }}</p>

    <div class="mb-6">
      <h2 class="text-xl font-semibold mb-2">{{ t('privacy-policy.sections.data-collection.title') }}</h2>
      <p class="text-gray-700 dark:text-gray-300">{{ t('privacy-policy.sections.data-collection.content') }}</p>
    </div>

    <div class="mb-6">
      <h2 class="text-xl font-semibold mb-2">{{ t('privacy-policy.sections.data-use.title') }}</h2>
      <p class="text-gray-700 dark:text-gray-300">{{ t('privacy-policy.sections.data-use.content') }}</p>
    </div>

    <div class="mb-6">
      <h2 class="text-xl font-semibold mb-2">{{ t('privacy-policy.sections.data-sharing.title') }}</h2>
      <p class="text-gray-700 dark:text-gray-300">{{ t('privacy-policy.sections.data-sharing.content') }}</p>
    </div>

    <div class="mb-6">
      <h2 class="text-xl font-semibold mb-2">{{ t('privacy-policy.sections.rights.title') }}</h2>
      <p class="text-gray-700 dark:text-gray-300">{{ t('privacy-policy.sections.rights.content') }}</p>
    </div>

    <p class="mt-8 text-gray-700 dark:text-gray-300">
      {{ t('privacy-policy.contact') }}
      <a href="mailto:contact@collect-n-verything.com" class="text-primary">
        contact@collect-n-verything.com
      </a>.
    </p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
  title: "privacy-policy.title",
});

const {t} = useI18n();
</script>