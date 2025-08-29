<template>
  <div class="mt-5">
    <AccountProcess v-if="auth.state.user" :id="auth.state.user.id"/>
  </div>
</template>

<script setup lang="ts">
import {AccountProcess} from "~/components/sections";

definePageMeta({
  layout: "default",
  title: "account.seo.title",
});

const auth = authStore();
</script>
