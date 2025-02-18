<template>
  <div class="w-full flex justify-center">
    <DataTable :columns-to-display="columnsToDisplay" />
  </div>
</template>

<script setup lang="ts">
import {DataTable} from "@/components/tables";
import type {User} from "@/types/models";

const {t} = useI18n();

const columnsToDisplay: { propertyName: keyof User; displayName: string }[] = [
  {
    propertyName: "id",
    displayName: "ID",
  },
  {
    propertyName: "firstname",
    displayName: "Prénom",
  },
  {
    propertyName: "lastname",
    displayName: "Nom",
  },
  {
    propertyName: "username",
    displayName: t("components.data-table.user.username"),
  },
  {
    propertyName: "email",
    displayName: "Email",
  }
]

definePageMeta({
  layout: "admin",
  title: "users.seo.title",
  middleware: ["admin"],
});
</script>
