<template>
  <section id="contact" class="flex flex-col items-center w-full mt-5 scroll-mt-[84px]">
    <div class="grid gap-4 text-center">
      <h1 class="text-3xl font-bold">{{ t("sections.contact.title") }}</h1>
      <p class="text-balance text-muted-foreground">
        {{ t("sections.contact.description") }}
      </p>
    </div>
    <div class="w-full max-w-[620px]">
      <ContactForm/>
    </div>
  </section>
</template>

<script setup lang="ts">
import {ContactForm} from "~/components/forms";

const {t} = useI18n();
</script>
