<template>
    <form @submit.prevent="handleSubmit" class="space-y-4 p-6 rounded-lg bg-card shadow">
      <div>
        <label class="block font-medium mb-1">Título</label>
        <input v-model="title" type="text" class="w-full px-4 py-2 border rounded focus:outline-none" required />
      </div>
      <div>
        <label class="block font-medium mb-1">Descripción</label>
        <textarea v-model="description" class="w-full px-4 py-2 border rounded focus:outline-none" rows="3" required />
      </div>
       <button type="submit" class="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700">
        {{ isEditing ? 'Actualizar Tarea' : 'Agregar Tarea' }}
      </button>
    </form>
</template>
  
<script setup>
  import { ref, watch } from 'vue'

  const props = defineProps({
    task: {
      type: Object,
      default: null
    }
  })
  
  const emit = defineEmits(['add-task', 'update-task'])
  
  const title = ref('')
  const description = ref('')
  const isEditing = ref(false)

  watch(
    () => props.task,
    (newTask) => {
      if (newTask) {
        title.value = newTask.title
        description.value = newTask.description
        isEditing.value = true
      } else {
        title.value = ''
        description.value = ''
        isEditing.value = false
      }
    },
    { immediate: true }
  )
  
  const handleSubmit = () => {
    if (title.value && description.value) {
      if (isEditing.value) {
        emit('update-task', { title: title.value, description: description.value })
      } else {
        emit('add-task', { title: title.value, description: description.value })
      }
      title.value = ''
      description.value = ''
      isEditing.value = false
    }
  }
</script>