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
        <Card class="shadow-xl border-primary relative hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle class="mb-2">{{ t("checkout.order-summary") }}</CardTitle>
          </CardHeader>
          <ProductDetails :price-id="priceId" :is-checkout="true" />
        </Card>
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
import {toast} from "~/components/ui/toast";
import {Card, CardHeader, CardTitle} from "~/components/ui/card";

const {t} = useI18n();
const route = useRoute();
const auth = authStore();
const apiUrl = process.env.NUXT_API_URL ?? "http://localhost:8000/v1/api";

const tab = ref<TabsValue>("login");
const isProcessing = ref(false);
const priceId = computed(() => route.query.price_id as string);

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

const changeTab = (newTab: string | number) => {
  if (!isValidTabValue(newTab)) return;
  tab.value = newTab;
};
</script>