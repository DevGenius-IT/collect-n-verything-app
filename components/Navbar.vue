<template>
  <div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
    <header
      :class="
        cn(
          'sticky sm:pl-44 transition-all ease-in-out duration-200 top-0 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6',
          {
            'sm:pl-44': !useDesign.state.toggleRetract,
          },
        )
      "
    >
      <Sheet>
        <SheetTrigger as-child>
          <Button size="icon" variant="outline" class="sm:hidden">
            <PanelLeft class="h-5 w-5" />
            <span class="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" class="sm:max-w-xs">
          <nav class="flex flex-col gap-20">
            <img src="/logo-desktop.png" alt="Logo fiches péagogiques" />
            <ul class="grid gap-6 text-lg font-medium">
              <li
                class="flex items-center gap-3"
                v-for="(item, index) in navigation"
                :key="index"
              >
                <NuxtLink
                  active-class="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary hover:text-white text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                  :to="item.to"
                  class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Icon :stroke-width="2" :name="item.icon" class="h-5 w-5" />
                </NuxtLink>
                <span>{{ t(item.title) }}</span>
              </li>
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
      <CustomBreadcrumb />
      <div class="relative ml-auto flex-1 md:grow-0">
        <Search
          class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
        />
        <Input
          type="search"
          placeholder="Rechercher...."
          class="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="secondary" size="icon" class="rounded-full">
            <CircleUser class="h-5 w-5" />
            <span class="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>kbrdn1</DropdownMenuLabel>
          <DropdownMenuLabel>kylianb1@icloud.com</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Réglages</DropdownMenuItem>
          <DropdownMenuItem>Aide</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem class="cursor-pointer" @click=""
            >Déconnexion</DropdownMenuItem
          >
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  </div>
</template>

<script lang="ts" setup>
import { cn } from "@/lib/utils";
import { CircleUser, PanelLeft, Search } from "lucide-vue-next";
import { navigation } from "~/constants";

const { t } = useI18n();

const useDesign = designStore();
</script>
