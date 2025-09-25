<template>
  <template v-if="pending">
    <CardContent>
      <Skeleton class="w-2/6 h-6"/>
      <Skeleton class="w-2/5 h-5 my-3"/>
      <ul class="space-y-2">
        <li v-for="i in 8" :key="i">
          <Skeleton class="w-3/4 h-4"/>
        </li>
      </ul>
    </CardContent>
    <CardFooter v-if="isCheckout">
      <div class="space-y-3 w-full">
        <div class="flex justify-between">
          <Skeleton class="w-1/5 h-4"/>
          <Skeleton class="w-2/6 h-4"/>
        </div>
        <div class="flex justify-between">
          <Skeleton class="w-2/5 h-4"/>
          <Skeleton class="w-2/6 h-4"/>
        </div>
        <hr/>
        <div class="flex justify-between pt-2">
          <Skeleton class="w-1/2 h-4"/>
          <Skeleton class="w-2/6 h-4"/>
        </div>
        <Skeleton class="w-1/3 h-2"/>
      </div>
    </CardFooter>
  </template>

  <template v-else-if="product && selectedPrice">
    <CardContent>
      <h4 class="text-xl font-semibold">{{ product.name }}</h4>
      <h5 class="my-2">{{ t("sections.prices.card.body.title") }}</h5>
      <ul class="text-sm space-y-1">
        <li
          v-for="feature in locale !== 'fr' ? product.metadata.enDescription.split('|') : product.description.split('|')"
          :key="feature"
        >
          <div class="flex items-center gap-x-2">
            <Icon name="Check" class="h-4 w-4"/>
            {{ feature }}
          </div>
        </li>
      </ul>
    </CardContent>
    <CardFooter v-if="isCheckout">
      <div class="space-y-2 w-full">
        <div class="flex justify-between items-center w-full">
          <span class="text-sm text-gray-600">{{ t("checkout.price") }}</span>
          <span class="font-medium">
              {{ formatPrice(selectedPrice.unit_amount, locale, selectedPrice.currency) }}
            </span>
        </div>

        <div v-if="selectedPrice.recurring?.interval" class="flex justify-between items-center w-full">
          <span class="text-sm text-gray-600">{{ t("checkout.billing-period") }}</span>
          <span class="text-sm">
              {{ t(`checkout.interval-${selectedPrice.recurring.interval}`) }}
            </span>
        </div>

        <hr/>

        <div class="flex justify-between items-center font-semibold text-lg w-full pt-2">
          <span>{{ t("checkout.total") }}</span>
          <span>{{ formatPrice(selectedPrice.unit_amount, locale, selectedPrice.currency) }}</span>
        </div>

        <p class="text-xs text-gray-500">
          {{ t("checkout.tax-info") }}
        </p>
      </div>
    </CardFooter>
  </template>

  <template v-else>
    <CardContent>
      <p class="text-red-500">{{ t("components.details.product.not-found") }}</p>
    </CardContent>
  </template>
</template>

<script setup lang="ts">
import {CardContent, CardFooter} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";
import {formatPrice} from "~/utils/format";
import {toast} from "~/components/ui/toast";
import type {Product} from "~/types/models";

const {t, locale} = useI18n();
const config = useRuntimeConfig();
const apiUrl = config.public.apiUrl;

const props = withDefaults(defineProps<{
  priceId: string;
  isCheckout?: boolean;
}>(), {
  isCheckout: false
});

const {data, pending, error} = await useAsyncData(`product-${props.priceId}`, async () => {
  const response = await $fetch<{ data: Product[] }>(`${apiUrl}/products`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.data || !response.data.length) throw new Error("No products found");

  const foundProduct = response.data.find(product =>
    product.prices.some(price => price.id === props.priceId)
  );

  if (!foundProduct) throw new Error("Product not found");

  return {
    product: foundProduct,
    selectedPrice: foundProduct.prices.find(price => price.id === props.priceId) || null,
  };
});

if (error.value) {
  toast({
    description: t("toasts.error"),
    variant: "destructive",
  });
}

const product = computed(() => data.value?.product ?? null);
const selectedPrice = computed(() => data.value?.selectedPrice ?? null);
</script>
