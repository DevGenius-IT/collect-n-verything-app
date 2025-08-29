<template>
  <div class="mt-5 max-w-[1200px] mx-auto px-2 sm:px-10 md:px-0 w-full">
    <h1 class="text-3xl font-bold mb-5 md:mb-8">{{ t("checkout.title") }}</h1>
    <div class="mb-8 flex-col-reverse flex md:flex-row md:justify-between w-full">
      <div v-if="!auth.state.user" class="flex-grow md:max-w-[520px] md:mr-10 lg:mr-20">
        <Tabs
          :model-value="tab"
          @update:model-value="changeTab"
          default-value="login"
          class="mx-auto grid gap-6 h-fit"
        >
          <TabsList class="grid w-full grid-cols-2 h-fit">
            <TabsTrigger value="login">{{ t("auth.tabs.login") }}</TabsTrigger>
            <TabsTrigger value="register">{{ t("auth.tabs.register") }}</TabsTrigger>
          </TabsList>
          <SignIn :changeTab="changeTab" :redirect-after-login="false"/>
          <SignUp :changeTab="changeTab" :redirect-after-login="false"/>
        </Tabs>
      </div>
      <div v-else class="flex-grow md:max-w-[480px] md:mr-10 lg:mr-20 md:pt-6">
        <div class="space-y-6">
          <div class="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p class="text-green-800">
              {{ t("checkout.logged-in-as") }}
              <span class="font-semibold">{{ auth.getFullName() }}</span>
            </p>
          </div>

          <Button
            :disabled="isProcessing"
            @click="createCheckoutSession"
            class="w-full"
            :aria-label="t('checkout.proceed')"
          >
            <span v-if="isProcessing" class="mr-2">
              <span class="animate-spin inline-block h-4 w-4 border-b-2 border-white rounded-full"></span>
            </span>
            {{ t("checkout.proceed") }}
          </Button>
        </div>
      </div>
      <div class="mb-5 md:w-[360px] md:sticky md:top-[84px] md:self-start">
        <Card v-if="productIsLoading" class="shadow-xl border-primary">
          <CardHeader>
            <CardTitle class="mb-2">
              <Skeleton class="w-5/6 h-6" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton class="w-2/6 h-6" />
            <Skeleton class="w-2/5 h-5 my-3" />
            <ul class="space-y-2">
              <li v-for="i in 8">
                <Skeleton class="w-3/4 h-4" />
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <div class="space-y-3 w-full">
              <div class="flex justify-between">
                <Skeleton class="w-1/5 h-4" />
                <Skeleton class="w-2/6 h-4" />
              </div>
              <div class="flex justify-between">
                <Skeleton class="w-2/5 h-4" />
                <Skeleton class="w-2/6 h-4" />
              </div>
              <hr/>
              <div class="flex justify-between pt-2">
                <Skeleton class="w-1/2 h-4" />
                <Skeleton class="w-2/6 h-4" />
              </div>
              <Skeleton class="w-1/3 h-2" />
            </div>
          </CardFooter>
        </Card>
        <ProductDetails
          v-else-if="product"
          :product="product"
          :selectedPrice="selectedPrice"
          :formatPrice="formatPrice"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Button} from "@/components/ui/button";
import {SignIn, SignUp} from "@/components/forms";
import {ProductDetails} from "@/components/details";
import type {Tabs as TabsValue} from "@/types/pages/auth/values";
import {isValidTabValue} from "~/types/guards";
import type {Product, Price} from "~/types/models";
import {toast} from "~/components/ui/toast";

const {t, locale} = useI18n();
const route = useRoute();
const router = useRouter();
const auth = authStore();
const apiUrl = process.env.NUXT_API_URL ?? "http://localhost:8000/v1/api";
const localePath = useLocalePath();

const tab = ref<TabsValue>("login");
const product = ref<Product | null>(null);
const selectedPrice = ref<Price | null>(null);
const productIsLoading = ref(false);
const isProcessing = ref(false);

const priceId = computed(() => route.query.price_id as string);

const fetchProductDetails = async () => {
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

const createCheckoutSession = async () => {
  if (!auth.state.user || !priceId.value) return;

  isProcessing.value = true;

  try {
    const response = await $fetch<{ url: string }>(`${apiUrl}/checkout/session`, {
      method: "POST",
      body: JSON.stringify({
        price_id: priceId.value,
        user_id: auth.state.user.id
      }),
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${auth.state.token}`
      },
    });

    if (response.url) {
      window.location.href = response.url;
    }
  } catch (error) {
    toast({
      description: t("toasts.error"),
      variant: "destructive"
    });
    isProcessing.value = false;
  }
};

const formatPrice = (amount: number, currency: string): string => {
  const price = amount / 100;
  return new Intl.NumberFormat(locale.value, {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(price);
};

const changeTab = (newTab: string | number) => {
  if (!isValidTabValue(newTab)) return;
  tab.value = newTab;
};

onMounted(() => {
  fetchProductDetails();
});
</script>