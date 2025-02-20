<template>
  <div class="w-full flex justify-center overflow-x-auto">
    <DataTable :fields api-path="users"/>
  </div>
</template>

<script setup lang="ts">
import {DataTable} from "@/components/tables";
import type {User} from "@/types/models";

const fields: (keyof User)[] = [
  "firstname",
  "lastname",
  "username",
  "email",
]

definePageMeta({
  layout: "admin",
  title: "users.seo.title",
  middleware: ["admin"],
});
</script>
