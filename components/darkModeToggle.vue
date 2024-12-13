<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed({
  get () {
    return colorMode.value === 'dark'
  },
  set () {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})
</script>

<template>
  <ClientOnly>
    <button
      @click="isDark = !isDark"
      aria-label="Toggle theme"
      class="p-2 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md"
    >
      <UIcon 
        :name="isDark ? 'i-heroicons-sun-20-solid' : 'i-heroicons-moon-20-solid'"
        class="w-6 h-6 text-gray-700 dark:text-gray-200"
      />
    </button>
  </ClientOnly>
</template>
