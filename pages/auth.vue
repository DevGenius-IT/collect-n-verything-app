<template>
  <div
    class="w-full lg:grid h-screen lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]"
  >
    <Tabs
      :model-value="tab"
      @update:model-value="changeTab"
      default-value="login"
      class="mx-auto my-auto grid sm:w-[450px] gap-6 h-fit p-4"
    >
      <TabsList class="grid w-full grid-cols-2 h-fit">
        <TabsTrigger value="login">{{ t("auth.tabs.login") }}</TabsTrigger>
        <TabsTrigger value="register">
          {{ t("auth.tabs.register") }}
        </TabsTrigger>
      </TabsList>
      <SignIn :changeTab/>
      <SignUp :changeTab/>
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
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {SignIn, SignUp} from "@/components/forms";
import type {Tabs as TabsValue} from "@/types/pages/auth/values";
import {isValidTabValue} from "~/types/guards";

definePageMeta({
  layout: "default",
  title: "auth.seo.title",
});

const {t} = useI18n();
const route = useRoute();
const tab = ref<TabsValue>("login");
const router = useRouter();
const localePath = useLocalePath();

onMounted(() => {
  const queryTab = route.query.tab;
  if (!isValidTabValue(queryTab)) return;
  tab.value = queryTab;
});

const changeTab = (newTab: string | number) => {
  if (!isValidTabValue(newTab)) return;

  tab.value = newTab;
  router.push(localePath({name: 'auth', query: {tab: newTab}}));
};
</script>
