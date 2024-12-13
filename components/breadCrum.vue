<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const links = ref([
  { label: 'Beranda', to: '/' },
  { label: 'Tentang Kami', to: '/tentang-kami' },
  { label: 'Kontak', to: '/kontak' },
  { label: 'Blog', to: '/blog' }
])

const route = useRoute()

const currentLinks = ref([...links.value])

watch(route, (newRoute) => {
  const matched = links.value.filter(link => newRoute.path.includes(link.to))
  currentLinks.value = matched
})
</script>

<template>
    <nav class="breadcrumb">
      <ol class="list-none p-0 inline-flex">
        <li v-for="(link, index) in currentLinks" :key="index" class="flex items-center">
          <span v-if="link.to">
            <nuxt-link :to="link.to" class="text-blue-600 hover:underline">
              {{ link.label }}
            </nuxt-link>
          </span>
          <span v-else>
            {{ link.label }}
          </span>
          <span v-if="index < currentLinks.length - 1" class="mx-2">></span>
        </li>
      </ol>
    </nav>
  </template>
  