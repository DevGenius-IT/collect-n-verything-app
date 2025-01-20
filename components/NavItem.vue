<template>
  <li
    :class="
      cn('flex items-center gap-3 w-full rounded-md px-2', {
        'bg-primary': route.path === item.to,
      })
    "
  >
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger as-child>
          <NuxtLink
            class="flex gap-3 items-center text-muted-foreground"
            :to="localePath(item.to)"
            active-class="text-primary-foreground"
          >
            <i
              :class="
                cn(
                  'flex h-9 w-9 shrink-0 items-center justify-center text-lg font-semibold md:h-8 md:w-8 md:text-base',
                  {
                    'rounded-full bg-primary hover:text-white text-primary-foreground':
                      isFirst,
                  },
                )
              "
            >
              <Icon :stroke-width="2" :name="item.icon" class="h-5 w-5" />
            </i>
            <span
              :class="[
                cn('span text-foreground whitespace-nowrap', {
                  hidden: useDesign.state.toggleRetract,
                }),
                cn(route.path === item.to && 'text-primary-foreground'),
              ]"
            >
              {{ t(item.title) }}
            </span>
          </NuxtLink>
        </TooltipTrigger>
        <TooltipContent side="right">{{ t(item.tooltip) }}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </li>
</template>

<script lang="ts" setup>
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { NavItemProps } from "~/types/components/props";

const localePath = useLocalePath();
const { t } = useI18n();

const route = useRoute();

const useDesign = designStore();

const { item, isFirst } = defineProps<NavItemProps>();
</script>
