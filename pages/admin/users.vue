<template>
  <div class="w-full flex justify-center overflow-x-auto">
    <DataTable :fields api-path="users"/>
  </div>
</template>

<script setup lang="ts">
import {DataTable} from "@/components/tables";
import type {User} from "@/types/models";

const fields: (keyof User)[] = [
  "lastname",
  "firstname",
  "username",
  "email",
  "phone_number",
  "has_newsletter"
]

definePageMeta({
  layout: "admin",
  title: "users.seo.title",
  middleware: ["admin"],
});
</script>
