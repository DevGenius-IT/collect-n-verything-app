<template>
  <div class="flex min-h-screen w-full bg-muted/40">
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <Navbar />
        <div class="grid transition-all duration-300 ease-in-out flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <slot />
        </div>
      </SidebarInset>
    </SidebarProvider>
  </div>
</template>

<script lang="ts" setup>

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { useLocaleHead } from "#i18n"

const { t } = useI18n();
const route = useRoute();
const head = useLocaleHead();
const title = computed(() => t((route.meta.title as string) ?? "app.title"));

useHead({
  title,
  meta: head.value.meta,
  link: head.value.link,
  htmlAttrs: {
    lang: head.value.htmlAttrs?.lang,
    dir: head.value.htmlAttrs?.dir,
  },
});

</script>
