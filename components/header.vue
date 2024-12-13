<template>
  <header class="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
    <div class="container mx-auto px-4 py-6 flex items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center space-x-2">
        <UIcon name="i-heroicons-outline-book-open" class="h-8 w-8 text-blue-500 dark:text-purple-400" />
        <h1 class="text-xl font-semibold">BlogName</h1>
      </div>

      <!-- Navigation -->
      <nav class="flex items-center space-x-4">
        <ul class="hidden md:flex items-center space-x-8">
          <li>
            <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800" />
          </li>
        </ul>

        <!-- Theme Toggle Button -->
        <DarkModeToggle />

        <!-- Mobile Menu Button -->
        <button class="block md:hidden text-blue-500 dark:text-purple-400 hover:text-gray-900 dark:hover:text-white" @click="toggleMobileMenu">
          <UIcon name="i-heroicons-outline-menu" class="h-8 w-8" />
        </button>
      </nav>
    </div>

    <!-- Mobile Menu -->
    <transition name="fade">
      <div v-if="mobileMenuOpen" class="md:hidden bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white py-4 space-y-4 text-center">
        <ul class="flex flex-col items-start px-4">
          <li v-for="link in links" :key="link.to">
            <nuxt-link :to="link.to" class="block py-2 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300" @click="closeMobileMenu">
              <UIcon :name="link.icon" class="mr-2 w-6 h-6" />
              {{ link.label }}
            </nuxt-link>
          </li>
        </ul>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '#build/components'

const links = [
  { label: 'Beranda', icon: 'i-heroicons-outline-home', to: 'https://www.boringan.com' },
  { label: 'Gallery', icon: 'i-heroicons-outline-information-circle', to: '/' },
]

const mobileMenuOpen = ref(false)
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
