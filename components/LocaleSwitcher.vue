<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="secondary" size="icon" class="rounded-full">
        <Globe class="h-[1.2rem] w-[1.2rem]"/>
        <span class="sr-only">{{ t("components.locale-switcher.toggle-locale") }}</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem
        v-for="locale in availableLocales"
        :key="locale.code"
        @click="switchLocale(locale.code)"
      >
        <div class="flex items-center gap-2">
          <div class="w-5 h-5 object-contain">
            <component :is="flagIcon(locale.code)"/>
          </div>
          <span>{{ locale.name }}</span>
        </div>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import {Button} from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Globe} from "lucide-vue-next";
import {computed} from 'vue';
import {FrenchFlag, UKFlag} from "~/components/icons";

const {t, locale, locales} = useI18n();
const switchLocalePath = useSwitchLocalePath();

const availableLocales = computed(() => {
  return locales.value.filter(l => l.code !== locale.value);
});

const switchLocale = (newLocale: string) => {
  navigateTo(switchLocalePath(newLocale));
};

const flagMap = {
  en: UKFlag,
  fr: FrenchFlag,
};

const flagIcon = (code: string) => flagMap[code] || h('span', code.toUpperCase());
</script>