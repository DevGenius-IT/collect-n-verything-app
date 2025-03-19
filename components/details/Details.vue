<template>
  <Sheet :open="isOpen" @update:open="onClose">
    <SheetContent class="w-full sm:min-w-[480px]">
      <SheetHeader class="mb-5">
        <SheetTitle>Détails</SheetTitle>
      </SheetHeader>

      <div v-if="isPending">
        <div v-for="n in 8" :key="n" class="flex w-full mb-4">
          <Skeleton class="w-1/3 h-[30px] rounded-md mr-4"/>
          <Skeleton class="w-full h-[30px] rounded-md"/>
        </div>
      </div>
      <div v-else-if="isError" class="text-red-500">{{ t("components.fetch-error") }}</div>
      <div v-else-if="title && listItems.length">
        <DetailsList :title=title :list-items="listItems" :dates-list="datesList"/>
      </div>
    </SheetContent>
  </Sheet>
</template>

<script setup lang="ts">

import type {DetailsProps} from "~/types/components/props";
import {useDateFormat} from "@vueuse/core";
import type {User} from "~/types/models";
import {isUser} from "~/types/guards";

const {id, apiPath, isOpen, onClose} = defineProps<DetailsProps>();
const {t} = useI18n();
const auth = authStore();
const apiUrl = process.env.NUXT_API_URL ?? "http://localhost:8000/v1";

const {isPending, isError, data} = useQuery<User>({
  queryKey: computed(() => [apiPath, id]),
  queryFn: () =>
    $fetch(`${apiUrl}/admin/${apiPath}/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${auth.state.token}`,
      },
    }),
  enabled: computed(() => isOpen && !!apiPath && !!id)
});

const title = ref<string>('');
const listItems = ref<any[]>([]);
const datesList = ref<any[]>([]);

watch(
  () => data.value,
  (newData) => {
    if (!newData) return;

    datesList.value = [
      newData.created_at && {
        label: t("components.details.dates.created-at"),
        value: useDateFormat(new Date(newData.created_at), t("components.details.dates.format")).value,
      },
      newData.updated_at && {
        label: t("components.details.dates.updated-at"),
        value: useDateFormat(new Date(newData.updated_at), t("components.details.dates.format")).value,
      },
      newData.deleted_at && {
        label: t("components.details.dates.deleted-at"),
        value: useDateFormat(new Date(newData.deleted_at), t("components.details.dates.format")).value,
      },
    ].filter(Boolean);

    if (isUser(newData)) {
      title.value = `${newData.firstname} ${newData.lastname}`;
      listItems.value = [
        {
          label: t("components.details.user.username"),
          value: newData.username,
        },
        {
          label: t("components.details.user.email"),
          value: newData.email,
        },
        {
          label: t("components.details.user.phone-number"),
          value: newData.phone_number ?? '',
        },
        {
          label: t("components.details.user.has-newsletter"),
          value: newData.has_newsletter ? t("dichotomous-answers.yes") : t("dichotomous-answers.no"),
        },
        {
          label: t("components.details.user.roles"),
          value: Object.keys(newData.roles ?? []).map(role => role.split('.').pop()),
        }
      ];
    }
  }
);

</script>
