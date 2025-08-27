<template>
  <header
    class="w-full sticky top-0 white:bg-white shadow-md bg-neutral-50 dark:bg-neutral-900 z-50 transition-colors duration-300 mb-4">
    <div class="container mx-auto px-4 py-3">
      <nav class="flex items-center justify-between">
        <NuxtLink :to="localePath('/')">
          <div class="flex items-center">
            <Logo class="h-7 w-7 text-primary mr-2"/>
            <h1 class="text-lg text-gray-900 dark:text-white">Collect & Verything</h1>
          </div>
        </NuxtLink>
        <div class="hidden lg:flex items-center space-x-6">
          <div v-if="!auth.state.user" class="flex items-center space-x-3">
            <LocaleSwitcher/>
            <ColorMode/>
          </div>
          <NuxtLink :to="localePath('/#service')"
                    class="text-gray-700 dark:text-gray-300 hover:primary dark:hover:text-orange-400 transition-colors">
            {{ t("sections.service.name") }}
          </NuxtLink>
          <NuxtLink to="#"
                    class="text-gray-700 dark:text-gray-300 hover:primary dark:hover:text-orange-400 transition-colors">
            {{ t("sections.demo.name") }}
          </NuxtLink>
          <NuxtLink to="#"
                    class="text-gray-700 dark:text-gray-300 hover:primary dark:hover:text-orange-400 transition-colors">
            {{ t("sections.prices.name") }}
          </NuxtLink>
          <NuxtLink :to="localePath('/#contact')"
                    class="text-gray-700 dark:text-gray-300 hover:primary dark:hover:text-orange-400 transition-colors">
            {{ t("sections.contact.name") }}
          </NuxtLink>
          <div v-if="!auth.state.user" class="flex items-center space-x-3">
            <NuxtLink :to="localePath({name: 'auth', query: {tab: 'login'}})"
                      class="text-gray-700 dark:text-gray-300 hover:primary dark:hover:text-orange-400 transition-colors">
              {{ t("auth.tabs.login") }}
            </NuxtLink>
            <NuxtLink :to="localePath({name: 'auth', query: {tab: 'register'}})"
                      class="bg-primary text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">
              {{ t("auth.tabs.register") }}
            </NuxtLink>
          </div>
          <div v-else class="flex items-center space-x-3">
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
                <DropdownMenuLabel>{{ auth.getFullName() }}</DropdownMenuLabel>
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
        </div>
        <div class="lg:hidden flex items-center space-x-4 sm:space-x-6">
          <div class="flex items-center space-x-2 sm:space-x-3">
            <LocaleSwitcher/>
            <ColorMode/>
          </div>
          <button class="text-gray-700 dark:text-gray-300" @click="toggleMobileMenu">
            <Icon name="Menu" class="h-7 w-7"/>
          </button>
        </div>
      </nav>

      <div v-if="mobileMenuOpen" class="lg:hidden py-4 space-y-3">
        <NuxtLink :to="localePath('/#service')"
                  class="block text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-orange-400 py-2 transition-colors">
          {{ t("sections.service.name") }}
        </NuxtLink>
        <NuxtLink to="#"
                  class="block text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-orange-400 py-2 transition-colors">
          {{ t("sections.demo.name") }}
        </NuxtLink>
        <NuxtLink to="#"
                  class="block text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-orange-400 py-2 transition-colors">
          {{ t("sections.prices.name") }}
        </NuxtLink>
        <NuxtLink :to="localePath('/#contact')"
                  class="block text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-orange-400 py-2 transition-colors">
          {{ t("sections.contact.name") }}
        </NuxtLink>
        <NuxtLink v-if="auth.state.user" to="#"
                  class="block text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-orange-400 py-2 transition-colors">
          {{ t("account.title") }}
        </NuxtLink>
        <div v-else class="space-y-3">
          <NuxtLink :to="localePath({name: 'auth', query: {tab: 'login'}})"
                    class="block text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-orange-400 py-2 transition-colors">
            {{ t("auth.tabs.login") }}
          </NuxtLink>
          <NuxtLink :to="localePath({name: 'auth', query: {tab: 'register'}})"
                    class="block bg-primary text-white px-4 py-2 rounded-md hover:bg-orange-600 text-center mt-4 transition-colors">
            {{ t("auth.tabs.register") }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {Logo} from "./icons";
import Icon from "~/components/Icon.vue";
import {CircleUser} from "lucide-vue-next";

const {t} = useI18n();
const localePath = useLocalePath();
const mobileMenuOpen = ref(false);
const auth = authStore();

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};
</script>