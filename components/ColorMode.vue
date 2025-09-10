<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button :aria-label="t('components.color-mode.toggle-theme')" variant="secondary" size="icon" class="rounded-full">
        <Moon
          class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        />
        <Sun
          class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        />
        <span class="sr-only">{{
          t("components.color-mode.toggle-theme")
        }}</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="colorMode.preference = 'light'">
        {{ t("components.color-mode.light") }}
      </DropdownMenuItem>
      <DropdownMenuItem @click="colorMode.preference = 'dark'">
        {{ t("components.color-mode.dark") }}
      </DropdownMenuItem>
      <DropdownMenuItem @click="colorMode.preference = 'system'">
        {{ t("components.color-mode.system") }}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun } from "lucide-vue-next";

const { t } = useI18n();

const colorMode = useColorMode();
</script>
