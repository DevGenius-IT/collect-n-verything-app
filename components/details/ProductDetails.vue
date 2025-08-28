<template>
  <Card class="shadow-xl border-primary relative hover:shadow-lg transition-all duration-300">
    <CardHeader>
      <CardTitle class="mb-2">{{ t("checkout.order-summary") }}</CardTitle>
    </CardHeader>
    <CardContent>
      <h4 class="text-xl font-semibold">{{ product.name }}</h4>
      <h5 class="my-2">{{ t("sections.prices.card.body.title") }}</h5>
      <ul class="text-sm space-y-1">
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
      <div v-if="selectedPrice" class="space-y-2 w-full">
        <div class="flex justify-between items-center w-full">
          <span class="text-sm text-gray-600">{{ t("checkout.price") }}</span>
          <span class="font-medium">
            {{ formatPrice(selectedPrice.unit_amount, selectedPrice.currency) }}
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
          <span>{{ formatPrice(selectedPrice.unit_amount, selectedPrice.currency) }}</span>
        </div>

        <p class="text-xs text-gray-500">
          {{ t("checkout.tax-info") }}
        </p>
      </div>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import type {Product, Price} from "~/types/models";

const {t, locale} = useI18n();

defineProps<{
  product: Product;
  selectedPrice: Price | null;
  formatPrice: (amount: number, currency: string) => string;
}>();
</script>