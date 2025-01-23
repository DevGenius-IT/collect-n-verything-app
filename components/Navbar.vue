<template>
  <nav class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
    <div
      :class="
        cn(
          'sticky sm:pl-44 transition-all ease-in-out duration-200 top-0 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6',
          {
            'sm:pl-48': !useDesign.state.toggleRetract,
          },
        )
      "
    >
      <Sheet>
        <SheetTrigger as-child>
          <Button
            size="icon"
            variant="outline"
            class="sm:hidden"
            @click="useDesign.state.toggleRetract = false"
          >
            <PanelLeft class="h-5 w-5" />
            <span class="sr-only">{{
              t("components.navbar.toggle-menu")
            }}</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" class="sm:max-w-xs p-4">
          <div class="flex flex-col gap-4">
            <div class="flex items-center gap-2">
              <img
                src="/logo-desktop-small.png"
                alt="Logo fiches péagogiques"
                class="h-10 w-10"
              />
              <span
                class="text-secondary-foreground-foreground whitespace-nowrap text-md"
              >
                Collect & Verything
              </span>
            </div>
            <Separator />
            <ul class="grid gap-6 text-lg font-medium">
              <NavItem
                v-for="(item, index) in navigation"
                :item="item"
                :is-first="index === 0"
                :key="index"
              />
            </ul>
          </div>
        </SheetContent>
      </Sheet>
      <!-- <CustomBreadcrumb /> -->
      <div class="relative ml-auto flex-1 md:grow-0 items-center">
        <Search class="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Rechercher...."
          class="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
        />
      </div>
      <ColorMode />
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="secondary" size="icon" class="rounded-full">
            <CircleUser class="h-5 w-5" />
            <span class="sr-only">{{
              t("components.navbar.toggle-user-menu")
            }}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>kbrdn1</DropdownMenuLabel>
          <DropdownMenuLabel>kylianb1@icloud.com</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>{{
            t("components.navbar.settings")
          }}</DropdownMenuItem>
          <DropdownMenuItem>{{ t("components.navbar.help") }}</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem class="cursor-pointer" @click="">{{
            t("components.navbar.settings")
          }}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { navigation } from "~/constants";
import { cn } from "@/lib/utils";
import { CircleUser, PanelLeft, Search } from "lucide-vue-next";
import { Separator } from "./ui/separator";

const { t } = useI18n();

const useDesign = designStore();
</script>
