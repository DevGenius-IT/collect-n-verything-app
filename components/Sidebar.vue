<template>
  <aside
    :class="
      cn(
        'fixed inset-y-0 left-0 z-10 hidden flex-col border-r bg-background sm:flex transition-all ease-in-out',
        {
          'w-16': useDesign.state.toggleRetract,
          'w-50': !useDesign.state.toggleRetract,
        },
      )
    "
  >
    <button
      :class="
        cn(
          'absolute duration-200 cursor-default hover:bg-gray-200 rounded-full ease-in-out right-4 top-4',
          {
            'rotate-180': useDesign.state.toggleRetract,
          },
        )
      "
      @click="useDesign.toggle()"
    >
      <Icon
        :stroke-width="2"
        color="gray"
        name="PanelLeftClose"
        id="icon"
        class="h-7 w-7 p-1 transition-all duration-200"
      />
    </button>
    <nav
      class="item flex flex-col mt-10 items-start justify-between h-full transition-all duration-200 ease-in-out"
    >
      <ul
        :class="
          cn('flex flex-col items-center gap-4 py-4 px-2 transition-all w-full', {
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
import { cn } from "@/lib/utils";

const useDesign = designStore();
</script>
