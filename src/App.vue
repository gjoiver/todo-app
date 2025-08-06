<template>
  <div class="min-h-screen bg-[--color-bg] text-gray-900">
    <main class="container mx-auto py-10 px-4">
      <h1 class="text-3xl font-bold mb-8 text-[--color-primary]">Mis Tareas</h1>
      <HomeView />
    </main>
  </div>
</template>

<script setup>
import HomeView from './views/HomeView.vue'
</script>