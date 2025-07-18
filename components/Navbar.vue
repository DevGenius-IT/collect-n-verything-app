<template>
  <nav class="flex flex-col gap-4 p-2 mb-4">
    <div
      class="sticky transition-all ease-in-out duration-200 top-0 flex h-14 items-center gap-4 border-b bg-background sm:static sm:h-auto sm:border-0 sm:bg-transparent justify-between"
    >
      <div class="flex items-center gap-2">
        <SidebarTrigger/>
        <Separator orientation="vertical" class="mr-2 h-4"/>
        <!-- <CustomBreadcrumb /> -->
      </div>
      <div class="relative ml-auto flex-1 md:grow-0 items-center">
        <Search class="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground"/>
        <Input
          type="search"
          :placeholder="t('components.navbar.search-placeholder')"
          class="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
        />
      </div>
      <LocaleSwitcher/>
      <ColorMode/>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="secondary" size="icon" class="rounded-full">
            <CircleUser class="h-5 w-5"/>
            <span class="sr-only">{{
                t("components.navbar.toggle-user-menu")
              }}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{{ fullName }}</DropdownMenuLabel>
          <DropdownMenuLabel>{{ auth.state.user?.email }}</DropdownMenuLabel>
          <DropdownMenuSeparator/>
          <DropdownMenuItem>{{
              t("components.navbar.settings")
            }}
          </DropdownMenuItem>
          <DropdownMenuItem>{{ t("components.navbar.help") }}</DropdownMenuItem>
          <DropdownMenuSeparator/>
          <DropdownMenuItem class="cursor-pointer" @click="auth.signOut">{{
              t("components.navbar.logout")
            }}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import {CircleUser, Search} from "lucide-vue-next";
import {SidebarTrigger} from "@/components/ui/sidebar";
import {Separator} from "./ui/separator";

const {t} = useI18n();
const auth = authStore();

const fullName = computed(
  () => `${auth.state.user?.firstname} ${auth.state.user?.lastname}`,
);
</script>
