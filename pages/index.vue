<template>
    <div>
      <div v-if="loading">Loading...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <img v-for="photo in paginatedPhotos" :key="photo.id" :src="photo.baseUrl" :alt="photo.filename" class="rounded shadow-lg" />
        </div>
        <div class="flex justify-center mt-8">
          <UButton @click="prevPage" :disabled="currentPage === 1">Previous</UButton>
          <span class="mx-4">{{ currentPage }} / {{ totalPages }}</span>
          <UButton @click="nextPage" :disabled="currentPage === totalPages">Next</UButton>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import type { GooglePhoto } from '~/types/googlePhotos'
  
  const photos = ref<GooglePhoto[]>([])
  const loading = ref(true)
  const error = ref<string | null>(null)
  const currentPage = ref(1)
  const itemsPerPage = 6
  
  const paginatedPhotos = computed(() => {
    if (!Array.isArray(photos.value)) {
      return []
    }
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return photos.value.slice(start, end)
  })
  
  const totalPages = computed(() => {
    return Math.ceil(photos.value.length / itemsPerPage)
  })
  
  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--
    }
  }
  
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
    }
  }
  
  onMounted(async () => {
    try {
      const response = await fetch('/api/photos')
      if (!response.ok) throw new Error(`Error fetching photos: ${response.statusText}`)
      const data = await response.json()
      if (!Array.isArray(data)) {
        throw new Error("Photos data is not an array")
      }
      photos.value = data as GooglePhoto[]
    } catch (err) {
      error.value = (err as Error).message
      console.error('Error loading photos:', err)
    } finally {
      loading.value = false
    }
  })
  </script>
  
  <style scoped>
  .container {
    max-width: 1200px;
  }
  </style>
  