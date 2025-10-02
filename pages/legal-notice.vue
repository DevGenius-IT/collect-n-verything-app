<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-5">
    <h1 class="text-2xl font-bold mb-8">{{ t('legal-notice.title') }}</h1>

    <div class="mb-6">
      <h2 class="text-xl font-semibold mb-2">{{ t('legal-notice.sections.publisher.title') }}</h2>
      <p class="text-gray-700 dark:text-gray-300">
        {{ t('legal-notice.sections.publisher.content') }}
      </p>
    </div>

    <div class="mb-6">
      <h2 class="text-xl font-semibold mb-2">{{ t('legal-notice.sections.director.title') }}</h2>
      <p class="text-gray-700 dark:text-gray-300">
        {{ t('legal-notice.sections.director.content1') }}
        <a href="mailto:romain.aroldi57@gmail.com" class="text-primary">romain.aroldi57@gmail.com</a>
        {{ t('legal-notice.sections.director.content2') }}
      </p>
    </div>

    <div class="mb-6">
      <h2 class="text-xl font-semibold mb-2">{{ t('legal-notice.sections.hosting.title') }}</h2>
      <p class="text-gray-700 dark:text-gray-300">
        {{ t('legal-notice.sections.hosting.content') }}
      </p>
    </div>

    <div class="mb-6">
      <h2 class="text-xl font-semibold mb-2">{{ t('legal-notice.sections.ip.title') }}</h2>
      <p class="text-gray-700 dark:text-gray-300">
        {{ t('legal-notice.sections.ip.content') }}
      </p>
    </div>

    <div class="mb-6">
      <h2 class="text-xl font-semibold mb-2">{{ t('legal-notice.sections.liability.title') }}</h2>
      <p class="text-gray-700 dark:text-gray-300">
        {{ t('legal-notice.sections.liability.content') }}
      </p>
    </div>

    <p class="mt-8 text-gray-700 dark:text-gray-300">
      {{ t('legal-notice.contact') }}
      <a href="mailto:contact@collect-n-verything.com" class="text-primary">
        contact@collect-n-verything.com
      </a>.
    </p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
  title: "legal-notice.title",
});

const {t} = useI18n();
</script>
