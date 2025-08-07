<template>
    <div class="bg-card p-4 rounded shadow-md flex flex-col justify-between">
      <div>
        <h2 class="text-xl font-semibold text-primary">{{ task.title }}</h2>
        <p class="text-gray-700 mt-2">{{ task.description }}</p>
      </div>
      <div class="flex justify-end gap-2 mt-4">
        <button
          @click="$emit('edit')"
          class="text-sm text-blue-500 hover:underline"
        >
          Editar
        </button>
        <button
          @click="$emit('delete')"
          class="text-sm text-red-500 hover:underline"
        >
          Eliminar
        </button>
      </div>
    </div>
</template>
  
<script setup>
  defineProps({
    task: {
      type: Object,
      required: true
    }
  })
</script>