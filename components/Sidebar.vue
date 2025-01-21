<template>
  <aside
    class="fixed inset-y-0 left-0 z-10 hidden py-4 px-2 flex-col gap-4 border-r bg-background sm:flex transition-all ease-in-out"
  >
    <div
      :class="
        cn('flex items-center gap-4 w-full transition-all', {
          'flex-col': useDesign.state.toggleRetract,
        })
      "
    >
      <img
        src="/logo-desktop-small.png"
        alt="Logo fiches péagogiques"
        class="h-7 w-7"
      />
      <span
        :class="
          cn(
            'text-secondary-foreground whitespace-nowrap text-md overflow-hidden transition-all',
            {
              hidden: useDesign.state.toggleRetract,
            },
          )
        "
      >
        Collect & Verything
      </span>
      <Button
        :class="
          cn(
            'transition-all cursor-default rounded-full ease-in-out hover:text-primary-foreground',
            {
              'rotate-180': useDesign.state.toggleRetract,
            },
          )
        "
        variant="secondary"
        size="icon"
        @click="useDesign.toggle()"
      >
        <Icon
          :stroke-width="2"
          :size="24"
          color="gray"
          name="PanelLeftClose"
          id="icon"
          class="transition-all duration-200"
        />
      </Button>
    </div>
    <Separator />
    <nav
      class="item flex flex-col items-start justify-between h-full transition-all duration-200 ease-in-out"
    >
      <ul
        :class="
          cn('flex flex-col items-center gap-4 transition-all w-full', {
            'items-start': !useDesign.state.toggleRetract,
          })
        "
      >
        <NavItem
          v-for="(item, index) in navigation"
          :item="item"
          :is-first="index === 0"
          :key="index"
        />
      </ul>
    </nav>
  </aside>
</template>

<script lang="ts" setup>
import { navigation } from "~/constants";
import Icon from "./Icon.vue";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const useDesign = designStore();
</script>
