<template>
  <Card class="w-full">
    <CardHeader>
      <CardTitle>{{ t("components.details.subscription.title") }}</CardTitle>
      <CardDescription>{{ t("components.details.subscription.description") }}</CardDescription>
    </CardHeader>
    <CardContent v-if="!isPending && data" class="space-y-8">
      <div class="space-y-2">
        <div class="flex justify-between">
          <span>{{ t("components.details.subscription.status.title") }}</span>
          <span class="font-medium">{{
              t(`components.details.subscription.status.values.${data.last_subscription.status}`)
            }}</span>
        </div>
        <div class="flex justify-between">
          <span>{{ t("components.details.subscription.amount") }}</span>
          <span class="font-medium">
          {{ formatPrice(data.last_subscription.plan.amount, locale, data.last_subscription.plan.currency) }}
        </span>
        </div>
        <div class="flex justify-between">
          <span class="text-nowrap">{{ t("components.details.subscription.period.title") }}</span>
          <div class="ml-2 text-end">
          <span class="font-medium">
          {{
              useDateFormat(new Date(data.last_subscription.current_period_start * 1000), t("components.details.dates.format")).value
            }}
        </span>
            {{ t("components.details.subscription.period.separator") }}
            <span class="font-medium">
          {{
                useDateFormat(new Date(data.last_subscription.current_period_end * 1000), t("components.details.dates.format")).value
              }}
        </span>
          </div>
        </div>
        <div>
          <Button @click="downloadInvoice" :disabled="isDownloading" class="mt-4">
            {{ t("components.details.subscription.download-invoice") }}
          </Button>
        </div>
      </div>
      <Card class="pt-4">
        <ProductDetails :price-id="data.last_subscription.plan.id"/>
      </Card>
    </CardContent>

    <CardContent v-else-if="isPending" class="space-y-8">
      <div class="space-y-3">
        <div class="flex justify-between">
          <Skeleton class="w-2/12 h-5"/>
          <Skeleton class="w-2/12 h-5"/>
        </div>
        <div class="flex justify-between">
          <Skeleton class="w-2/12 h-5"/>
          <Skeleton class="w-3/12 h-5"/>
        </div>
        <div class="flex justify-between">
          <Skeleton class="w-2/12 h-5"/>
          <Skeleton class="w-7/12 h-5"/>
        </div>
        <div>
          <Skeleton class="w-4/12 h-8 mt-7"/>
        </div>
      </div>
      <Card class="pt-4">
      </Card>
    </CardContent>

    <CardContent v-else-if="noSubscription">
      <div class="text-gray-700 dark:text-gray-300">
        <p>
          {{ t("components.details.subscription.no-subscription") }}
        </p>
        <p class="mt-1 text-lg">
          <NuxtLink :to="localePath('/#prices')" class="text-primary hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
            {{ t("components.details.subscription.discover-our-offers") }}
          </NuxtLink>
        </p>
      </div>
    </CardContent>

    <CardContent v-else-if="isError" class="text-red-500">
      {{ t("components.fetch-error") }}
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {useQuery} from "@tanstack/vue-query";
import type {InvoiceResponse, SubscriptionResponse} from "~/types/constants";
import {useDateFormat} from "@vueuse/core";
import {ProductDetails} from "~/components/details/index";
import {authStore} from "~/stores/AuthStore";
import {useI18n} from "vue-i18n";
import {useLocalePath} from "#i18n";

const {t, locale} = useI18n();
const auth = authStore();
const localePath = useLocalePath();
const config = useRuntimeConfig();
const apiUrl = config.public.apiUrl;
const isDownloading = ref(false);
const noSubscription = ref(false)

const {isPending, isError, data} = useQuery<SubscriptionResponse | null, Error>({
  queryKey: ['subscriptions'],
  queryFn: async () => {
    try {
      return await $fetch<SubscriptionResponse>(`${apiUrl}/subscriptions/get-last`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${auth.state.token}`,
        },
      })
    } catch (err: any) {
      if (err?.response?.status === 404) {
        noSubscription.value = true
        return null
      }
      throw err
    }
  },
})

const downloadInvoice = async () => {
  const invoiceId = data.value?.last_subscription.latest_invoice;

  if (!invoiceId) return;

  isDownloading.value = true;
  try {
    const {invoice_pdf}: InvoiceResponse = await $fetch(`${apiUrl}/invoices/${invoiceId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.state.token}`,
      },
    });
    window.open(invoice_pdf, "_blank");
  } catch (err) {
    console.error(err);
    alert("Une erreur est survenue lors du téléchargement de la facture.");
  } finally {
    isDownloading.value = false;
  }
};
</script>
