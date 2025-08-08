<template>
    <div class="bg-card p-4 rounded shadow-md flex flex-col justify-between">
      <div>
        <h2 class="text-xl font-semibold text-primary">{{ task.title }}</h2>
        <p class="text-gray-700 mt-2">{{ task.description }}</p>
        <span
          class="inline-block mt-2 px-2 py-1 rounded text-xs"
          :class="{
            'bg-gray-300 text-gray-800': task.status === 'pending',
            'bg-yellow-300 text-yellow-900': task.status === 'in-progress',
            'bg-green-300 text-green-900': task.status === 'completed'
          }"
        >
          {{ statusLabel[task.status] }}
        </span>
      </div>
      <div class="flex justify-end gap-2 mt-4">
        <button
          @click="$emit('toggle-status')"
          class="text-sm text-gray-600 hover:underline"
        >
          Cambiar estado
        </button>
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

  const statusLabel = {
    pending: 'Sin iniciar',
    'in-progress': 'En curso',
    completed: 'Completada'
  }
</script>