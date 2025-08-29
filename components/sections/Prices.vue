<template>
  <section id="prices" class="flex flex-col items-center w-full mt-5 scroll-mt-[84px] space-y-8 md:space-y-12">
    <div class="grid gap-4 text-center">
      <h1 class="text-3xl font-bold">{{ t("sections.prices.title") }}</h1>
      <h2 class="text-balance text-muted-foreground">
        {{ t("sections.prices.description") }}
      </h2>
    </div>
    <div class="w-full">
      <div v-if="isPending" class="flex justify-center items-center p-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
      <div v-else-if="isError" class="text-center text-red-500 p-4">
        {{ t("components.fetch-error") }}
      </div>
      <div v-else-if="data?.data" class="grid gap-6 md:gap-8 lg:gap-12 md:grid-cols-3">
        <Card
          v-for="product in sortedProducts"
          :key="product.id"
          :class="{
            'shadow-xl md:scale-105 border-primary relative': product.metadata.order === '2',
            'hover:shadow-lg transition-all duration-300': true
          }"
        >
          <CardHeader>
            <CardTitle class="mb-2">{{ product.name }}</CardTitle>
            <CardDescription>
              <div class="flex flex-col">
                <div
                  v-for="price in getSortedPrices(product.prices)"
                  :key="price.id"
                  class="mt-0.5"
                >
                  <div v-if="price.recurring?.interval === 'month'" class="text-base">
                    <span class="font-semibold">
                      {{ formatPrice(price.unit_amount, price.currency) }}
                    </span>
                    {{ t("sections.prices.card.header.per-month") }}
                  </div>
                  <div v-else>
                    {{ t("sections.prices.card.header.or") }}
                    <span class="font-semibold">
                      {{ formatPrice(price.unit_amount, price.currency) }}
                    </span>
                    {{ t("sections.prices.card.header.per-year") }}
                    <span class="font-semibold text-primary">
                      {{ t("sections.prices.card.header.saving") }}
                    </span>
                  </div>
                </div>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h4 class="font-semibold">{{ t("sections.prices.card.body.title") }}</h4>
            <ul class="text-sm mt-3 space-y-1">
              <li
                v-for="feature in locale !== 'fr' ? product.metadata.enDescription.split('|') : product.description.split('|')">
                <div class="flex items-center gap-x-2">
                  <Icon name="Check" class="h-4 w-4"/>
                  {{ feature }}
                </div>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              :aria-label="t('sections.prices.card.body.btn')"
              :variant="product.metadata.order === '2' ? 'default' : 'secondary'"
              @click="navigateToCheckout(getSortedPrices(product.prices)[0].id)"
            >
              {{ t("sections.prices.card.body.btn") }}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {useQuery} from "@tanstack/vue-query";
import {Button} from "@/components/ui/button";
import type {ProductPagination} from "~/types/constants";
import type {Price} from "~/types/models";

const {t, locale} = useI18n();
const router = useRouter();
const localePath = useLocalePath();
const apiUrl = process.env.NUXT_API_URL ?? "http://localhost:8000/v1/api";

const {isPending, isError, data} = useQuery({
  queryKey: ['products'],
  queryFn: () => $fetch<ProductPagination>(`${apiUrl}/products`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
});

const sortedProducts = computed(() => {
  if (!data.value?.data) return [];

  return [...data.value.data].sort((a, b) => {
    const orderA = a.metadata?.order ? Number(a.metadata.order) : 0;
    const orderB = b.metadata?.order ? Number(b.metadata.order) : 0;

    return orderA - orderB;
  });
});

const getSortedPrices = (prices: Price[]): Price[] => {
  if (!prices || prices.length === 0) return [];

  return [...prices].sort((a, b) => {
    if (a.recurring?.interval === 'month' && b.recurring?.interval !== 'month') {
      return -1;
    }
    if (b.recurring?.interval === 'month' && a.recurring?.interval !== 'month') {
      return 1;
    }

    return 0;
  });
};

const formatPrice = (amount: number, currency: string): string => {
  const price = amount / 100;
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(price);
};

const navigateToCheckout = (priceId: string) => {
  router.push(localePath({
    path: '/checkout',
    query: { price_id: priceId }
  }));
};
</script>