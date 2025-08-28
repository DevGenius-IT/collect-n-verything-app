<template>
  <div class="mt-5 w-full">
    <h1 class="text-3xl font-bold mb-5 md:mb-8">{{ t("session.success.title") }}</h1>
    <p class="text-balance text-muted-foreground">
      {{ t("session.success.description") }}
      <span class="font-semibold text-primary">
        <NuxtLink :to="localePath('account')">
          {{ t("session.success.descriptionLink") }}
        </NuxtLink>
      </span>.
    </p>
  </div>
</template>

<script setup lang="ts">
const {t, locale} = useI18n();
const route = useRoute();
const router = useRouter();
const auth = authStore();
const apiUrl = process.env.NUXT_API_URL ?? "http://localhost:8000/v1/api";
const localePath = useLocalePath();

const sessionId = computed(() => route.query.session_id as string);

/*const fetchProductDetails = async () => {
  if (!priceId.value) {
    return await router.push(localePath({
      path: '/',
    }));
  }

  try {
    productIsLoading.value = true;

    const response = await $fetch<{ data: Product[] }>(`${apiUrl}/products`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.data || !response.data.length) throw new Error("No products found");

    const foundProduct = response.data.find(product =>
      product.prices.some(price => price.id === priceId.value)
    );

    if (!foundProduct) throw new Error("Product not found");

    product.value = foundProduct;
    selectedPrice.value = foundProduct.prices.find(price => price.id === priceId.value) || null;
  } catch (error) {
    toast({
      description: t("toasts.error"),
      variant: "destructive"
    });
    await router.push(localePath({
      path: '/',
    }));
  } finally {
    productIsLoading.value = false;
  }
};

onMounted(() => {
  fetchProductDetails();
});*/
</script>