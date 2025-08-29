<template>
  <div class="flex flex-col gap-5 md:gap-8">
    <div class="flex w-full justify-between gap-5 md:gap-8 flex-col md:flex-row">
      <Card class="w-full md:max-w-[480px]">
        <CardHeader class="text-xl">
          {{ t("account.myInfo") }}
        </CardHeader>
        <CardContent>
          <div v-if="isPending" class="space-y-5">
            <div v-for="i in 6" class="flex flex-col w-full space-y-2">
              <Skeleton class="w-1/5 h-4"/>
              <Skeleton class="w-full h-8"/>
            </div>
            <Skeleton class="w-1/4 h-10 !mt-8"/>
          </div>
          <UserForm v-else-if="data" :id="id" :is-for-admin="false" />
          <div v-else-if="isError" class="text-red-500">{{ t("components.fetch-error") }}</div>
        </CardContent>
      </Card>
      <Card class="w-full">
        <CardHeader class="text-xl">
          {{ t("account.myInfo") }}
        </CardHeader>
      </Card>
    </div>
    <Card class="w-full">
      <CardHeader class="text-xl">
        {{ t("account.passwordUpdate") }}
      </CardHeader>
      <CardContent>
        <UpdatePassword/>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import {useQuery} from "@tanstack/vue-query";
import type {User} from "~/types/models";
import {UpdatePassword, UserForm} from "~/components/forms";

const {t} = useI18n();
const {id} = defineProps<{ id: number }>();
const apiUrl = process.env.NUXT_API_URL ?? "http://localhost:8000/v1/api";
const auth = authStore();

const {isPending, isError, data} = useQuery<User>({
  queryKey: [id],
  queryFn: () => $fetch(`${apiUrl}/users/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth.state.token}`,
    }
  }),
});
</script>
