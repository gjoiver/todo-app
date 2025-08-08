<template>
    <div class="home space-y-8">
      <TaskForm @add-task="addTask" :task="editingTask" @update-task="updateTask" />
      <div class="flex gap-2 mb-4">
         <button
          v-for="option in filterOptions"
          :key="option.value"
          @click="filterStatus = option.value"
          :class="['px-3 py-1 rounded', filterStatus === option.value ? 'bg-primary text-white' : 'bg-gray-200']"
        >
          {{ option.label }}
        </button>
      </div>
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <TaskCard
          v-for="(task) in filteredTasks"
          :key="task.id"
          :task="task"
          @delete="deleteTask(task.id)"
          @edit="startEditTask(task)"
          @toggle-status="toggleStatus(task.id)"
        />
      </div>
    </div>
</template>
  
<script setup>
  import { ref, watch, computed } from 'vue'
  import TaskForm from '@/components/TaskForm.vue'
  import TaskCard from '@/components/TaskCard.vue'

   const filterOptions = [
    { label: 'Todas', value: 'all' },
    { label: 'Sin iniciar', value: 'pending' },
    { label: 'En curso', value: 'in-progress' },
    { label: 'Completadas', value: 'completed' }
  ]
  const filterStatus = ref('all')
  
  const tasks = ref([])
  const editingTask = ref(null)
  const editingIndex = ref(null)

    // Cargar tareas de localStorage al iniciar
  if (localStorage.getItem('tasks')) {
    try {
      tasks.value = JSON.parse(localStorage.getItem('tasks'))
    } catch (e) {
      tasks.value = []
    }
  }

  // Guardar tareas en localStorage cada vez que cambian
  watch(tasks, (newTasks) => {
    localStorage.setItem('tasks', JSON.stringify(newTasks))
  }, { deep: true })
  
  // Computed para filtrar tareas
  const filteredTasks = computed(() => {
    if (filterStatus.value === 'all') return tasks.value
    return tasks.value.filter(task => task.status === filterStatus.value)
  })

  // Agregar tarea con estado por defecto
  const addTask = (task) => {
    tasks.value.push({ ...task, status: 'pending', id: Date.now() + Math.random() })
  }
  
  const deleteTask = (id) => {
    const idx = tasks.value.findIndex(t => t.id === id)
    if (idx !== -1) tasks.value.splice(idx, 1)
  }

   const startEditTask = (task) => {
    const idx = tasks.value.findIndex(t => t.id === task.id)
    editingTask.value = { ...task }
    editingIndex.value = idx
  }

    const updateTask = (updatedTask) => {
    if (editingIndex.value !== null) {
      // Mantener el estado anterior
      tasks.value[editingIndex.value] = { ...updatedTask, status: tasks.value[editingIndex.value].status, id:  tasks.value[editingIndex.value].id}
      editingTask.value = null
      editingIndex.value = null
    }
  }

  // Cambiar el estado de la tarea
  const toggleStatus = (id) => {
    const idx = tasks.value.findIndex(t => t.id === id)
  if (idx !== -1) {
    const statusOrder = ['pending', 'in-progress', 'completed']
    const current = tasks.value[idx].status
    const nextIndex = (statusOrder.indexOf(current) + 1) % statusOrder.length
    tasks.value[idx].status = statusOrder[nextIndex]
  }
  }
</script>
  
<style>
  .home {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
</style>