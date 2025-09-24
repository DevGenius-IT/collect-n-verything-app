<template>
  <Sidebar collapsible="icon">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <SidebarMenuButton
                size="lg"
                class="data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
              >
                <div
                  class="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"
                >
                  <Logo class="h-6 w-6"/>
                </div>
                <div class="grid flex-1 text-left text-sm leading-tight">
                  <span class="truncate font-semibold"
                  >Collect & Verything</span
                  >
                  <span class="truncate text-xs">{{ t("dashboard.title") }}</span>
                </div>
                <Icon name="ChevronsUpDown" class="ml-auto"/>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              align="start"
              side="bottom"
              :side-offset="4"
            >
              <DropdownMenuLabel
                class="text-xs text-muted-foreground flex items-center gap-2 p-1"
              >
                Collect & Verything
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>{{ t("dashboard.main") }}</SidebarGroupLabel>
        <SidebarMenu>
          <template v-for="item in navigation">
            <Collapsible
              v-if="item.subItems"
              :key="item.title"
              as-child
              :default-open="false"
              class="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger as-child>
                  <SidebarMenuButton :tooltip="item.title">
                    <Icon :name="item.icon" :stroke-width="2"/>
                    <span>{{ t(item.title) }}</span>
                    <Icon
                      name="ChevronRight"
                      class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem
                      v-for="subItem in item.subItems"
                      :key="subItem.title"
                    >
                      <SidebarMenuSubButton
                        :class="
                          route.path === subItem.to
                            ? 'bg-secondary'
                            : 'bg-transparent'
                        "
                        as-child
                      >
                        <NuxtLink :to="localePath(subItem.to)">
                          <span>{{ t(subItem.title) }}</span>
                        </NuxtLink>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
            <SidebarMenuItem
              v-else
              class="hover:bg-foreground/10 rounded-md transition-all"
            >
              <NuxtLink :to="localePath(item.to ?? '')" active-class="text-primary">
                <SidebarMenuButton :tooltip="item.title">
                  <Icon :name="item.icon" :stroke-width="2"/>
                  <span>{{ t(item.title) }}</span>
                </SidebarMenuButton>
              </NuxtLink>
            </SidebarMenuItem>
          </template>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <SidebarMenuButton
                size="lg"
                class="data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
              >
                <Avatar class="h-8 w-8 rounded-lg">
                  <!-- <AvatarImage :src="data.user.avatar" :alt="data.user.name" /> -->
                  <AvatarFallback class="rounded-lg">
                    {{
                      auth.state.user?.lastname.slice(0, 1)
                    }}{{ auth.state.user?.firstname.slice(0, 1) }}
                  </AvatarFallback>
                </Avatar>
                <div class="grid flex-1 text-left text-sm leading-tight">
                  <span class="truncate font-semibold">{{
                      auth.state.user?.username
                    }}</span>
                  <span class="truncate text-xs">{{
                      auth.state.user?.email
                    }}</span>
                </div>
                <Icon name="ChevronsUpDown" class="ml-auto size-4"/>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side="bottom"
              align="end"
              :side-offset="4"
            >
              <DropdownMenuLabel class="p-0 font-normal">
                <div
                  class="flex items-center gap-2 px-1 py-1.5 text-left text-sm"
                >
                  <Avatar class="h-8 w-8 rounded-lg">
                    <!-- <AvatarImage :src="data.user.avatar" :alt="data.user.name" /> -->
                    <AvatarFallback class="rounded-lg">
                      {{ auth.getInitials() }}
                    </AvatarFallback>
                  </Avatar>
                  <div class="grid flex-1 text-left text-sm leading-tight">
                    <span class="truncate font-semibold">{{
                        auth.getFullName()
                      }}</span>
                    <span class="truncate text-xs">{{
                        auth.state.user?.email
                      }}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator/>
              <DropdownMenuItem class="cursor-pointer" @click="auth.signOut">
                <Icon name="LogOut"/>
                {{ t("components.navbar.logout") }}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
    <SidebarRail/>
  </Sidebar>
</template>

<script lang="ts" setup>
import {navigation} from "~/constants";
import {Logo} from "./icons";
import Icon from "./Icon.vue";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";

const localePath = useLocalePath();
const auth = authStore();
const route = useRoute();
const {t} = useI18n();
</script>
