<template>
  <Html :lang="head.htmlAttrs?.lang" :dir="head.htmlAttrs?.dir">
    <Head>
      <Title>{{ title }}</Title>
      <template v-for="link in head.link" :key="link.hid">
        <Link
          :id="link.hid"
          :rel="link.rel"
          :href="link.href"
          :hreflang="link.hreflang"
        />
      </template>
      <template v-for="meta in head.meta" :key="meta.hid">
        <Meta
          :id="meta.hid"
          :property="meta.property"
          :content="meta.content"
        />
      </template>
    </Head>
    <Body>
      <main class="flex min-h-screen w-full flex-col bg-muted/40">
        <Sidebar />
        <Navbar />
        <div
          class="grid transition-all duration-300 ease-in-out flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8"
        >
          <slot />
        </div>
      </main>
    </Body>
  </Html>
</template>

<script lang="ts" setup>
import { cn } from "~/lib/utils";

const { t } = useI18n();
const route = useRoute();
const head = useLocaleHead();
const title = computed(() => t((route.meta.title as string) ?? "app.title"));
const useDesign = designStore();
</script>
