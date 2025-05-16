<template>
  <header class="sticky top-0 white:bg-white shadow-sm z-50 transition-colors duration-300">
    <div class="container mx-auto px-4 py-3">
      <nav class="flex items-center justify-between">
        <div class="flex items-center">
          <Logo class="h-7 w-7 text-primary mr-2" />
          <h1 class="text-lg text-gray-900 dark:text-white">Collect & Verything</h1>
        </div>
        <div class="hidden md:flex items-center space-x-6">
          <ColorMode />
          <NuxtLink to="#" class="text-gray-700 dark:text-gray-300 hover:primary dark:hover:text-orange-400 transition-colors">Service</NuxtLink>
          <NuxtLink to="#" class="text-gray-700 dark:text-gray-300 hover:primary dark:hover:text-orange-400 transition-colors">Demo</NuxtLink>
          <NuxtLink to="#" class="text-gray-700 dark:text-gray-300 hover:primary dark:hover:text-orange-400 transition-colors">Tarifs</NuxtLink>
          <NuxtLink to="#" class="text-gray-700 dark:text-gray-300 hover:primary dark:hover:text-orange-400 transition-colors">Contact</NuxtLink>
          <NuxtLink to="#" class="text-gray-700 dark:text-gray-300 hover:primary dark:hover:text-orange-400 transition-colors">Sign in</NuxtLink>
          <NuxtLink to="#" class="bg-primary text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">Sign up</NuxtLink>
        </div>
        <div class="md:hidden flex items-center space-x-3">
          <ColorMode />
          <button class="text-gray-700 dark:text-gray-300" @click="toggleMobileMenu">
            <Icon name="Menu" class="h-7 w-7" />
          </button>
        </div>
      </nav>

      <div v-if="mobileMenuOpen" class="md:hidden py-4 space-y-3">
        <NuxtLink to="#" class="block text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-orange-400 py-2 transition-colors">Service</NuxtLink>
        <NuxtLink to="#" class="block text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-orange-400 py-2 transition-colors">Demo</NuxtLink>
        <NuxtLink to="#" class="block text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-orange-400 py-2 transition-colors">Tarifs</NuxtLink>
        <NuxtLink to="#" class="block text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-orange-400 py-2 transition-colors">Contact</NuxtLink>
        <NuxtLink to="#" class="block text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-orange-400 py-2 transition-colors">Sign in</NuxtLink>
        <NuxtLink to="#" class="block bg-primary text-white px-4 py-2 rounded-md hover:bg-orange-600 text-center mt-4 transition-colors">
          Sign up
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { Logo } from "./icons";
import Icon from "~/components/Icon.vue";

const mobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};
</script>