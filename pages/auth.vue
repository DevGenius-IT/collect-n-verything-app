<template>
  <div
    class="w-full lg:grid h-screen lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]"
  >
    <Tabs
      v-model:tab="tab"
      default-value="login"
      class="mx-auto my-auto grid sm:w-[450px] gap-6 h-fit p-4"
    >
      <TabsList class="grid w-full grid-cols-2 h-fit">
        <TabsTrigger value="login">{{ t("auth.tabs.login") }}</TabsTrigger>
        <TabsTrigger value="register">{{
          t("auth.tabs.register")
        }}</TabsTrigger>
      </TabsList>
      <SignIn :changeTab />
      <SignUp :changeTab />
    </Tabs>
    <div class="hidden lg:block bg-muted">
      <img
        src="/placeholder.svg"
        alt="Placeholder"
        width="1920"
        height="1080"
        class="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignIn, SignUp } from "@/components/forms";
import type { Tabs as TabsValue } from "@/types/pages/auth/values";

definePageMeta({
  layout: "default",
  title: "auth.seo.title",
});

const { t } = useI18n();

const tab = ref<TabsValue>("login");

const changeTab = (newTab: TabsValue) => {
  tab.value = newTab;
};
</script>
