<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
    <div v-else>
      <div class="max-w-4xl mx-auto bg-white rounded shadow-lg p-6">
        <img v-if="photo" :src="photo.baseUrl" :alt="photo.filename" class="rounded shadow-lg w-full object-cover mb-4" />
        <h1 v-if="photo" class="text-2xl font-bold mb-2">{{ photo.filename }}</h1>
        <p v-if="photo">Photo ID: {{ photo.id }}</p>
        <p v-if="photo">Photo Base URL: {{ photo.baseUrl }}</p>
        <!-- Tambahkan detail lainnya yang ingin Anda tampilkan di sini -->
      </div>
      <div class="mt-8">
        <UButton @click="goBack" class="btn">Back to Gallery</UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { GooglePhoto } from '~/types/googlePhotos'

const route = useRoute()
const router = useRouter()
const photoId = route.params.id
const photo = ref<GooglePhoto | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const goBack = () => {
  router.push('/')
}

onMounted(async () => {
  try {
    const response = await fetch(`/api/photos/${photoId}`)
    if (!response.ok) throw new Error(`Error fetching photo: ${response.statusText}`)
    const data = await response.json()
    photo.value = data as GooglePhoto
  } catch (err) {
    error.value = (err as Error).message
    console.error('Error loading photo:', err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.btn {
  @apply bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors;
}
.btn:disabled {
  @apply bg-gray-400 cursor-not-allowed;
}
</style>
