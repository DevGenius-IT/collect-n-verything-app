<template>
  <div class="mt-5 w-full">
    <h1 class="text-3xl font-bold mb-5 md:mb-8">{{ t("session.success.title") }}</h1>
    <p class="text-balance text-muted-foreground">
      {{ t("session.success.description") }}
      <span class="font-semibold text-primary">
        <NuxtLink :to="localePath('account')">
          {{ t("session.success.descriptionLink") }}
        </NuxtLink>
      </span>.
    </p>
    <div class="max-w-[580px] mt-5 md:mt-8">
      <SubscriptionDetails/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {SubscriptionDetails} from "@/components/details";

const {t} = useI18n();
const localePath = useLocalePath();
</script>