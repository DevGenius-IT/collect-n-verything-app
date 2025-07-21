<template>
  <footer
    class="w-full flex flex-col justify-center items-center mt-5 bg-neutral-900 text-white dark:bg-neutral-50 dark:text-neutral-900">
    <div class="flex w-8/12 py-10">
      <div class="flex w-1/2 flex-col py-2 justify-between border-r">
        <NuxtLink :to="localePath('/')">
          <div class="flex items-center">
            <Logo class="h-7 w-7 text-primary mr-2"/>
            <h1 class="text-lg">Collect & Verything</h1>
          </div>
        </NuxtLink>
      </div>
      <div class="flex w-1/2 flex-col py-2 gap-y-2 px-10">
        <NuxtLink :to="localePath('/#service')"
                  class="text-gray-300 dark:text-gray-700 hover:hover:text-orange-400 dark:hover:primary transition-colors">
          {{ t("sections.service.name") }}
        </NuxtLink>
        <NuxtLink to="#"
                  class="text-gray-300 dark:text-gray-700 hover:hover:text-orange-400 dark:hover:primary transition-colors">
          {{ t("sections.demo.name") }}
        </NuxtLink>
        <NuxtLink to="#"
                  class="text-gray-300 dark:text-gray-700 hover:hover:text-orange-400 dark:hover:primary transition-colors">
          {{ t("sections.prices.name") }}
        </NuxtLink>
        <NuxtLink to="#"
                  class="text-gray-300 dark:text-gray-700 hover:hover:text-orange-400 dark:hover:primary transition-colors">
          {{ t("sections.contact.name") }}
        </NuxtLink>
      </div>
    </div>
    <span class="text-xs text-neutral-500 mb-3">© Collect & Vervthing - {{ new Date().getFullYear() }}</span>
  </footer>
</template>

<script setup lang="ts">
import {Logo} from "~/components/icons";

const localePath = useLocalePath();
const {t} = useI18n();
</script>
