<template>
    <div class="space-y-8">
      <TaskForm @add-task="addTask" :task="editingTask" @update-task="updateTask" />
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <TaskCard
          v-for="(task, index) in tasks"
          :key="index"
          :task="task"
          @delete="deleteTask(index)"
          @edit="startEditTask(task, index)"
        />
      </div>
    </div>
</template>
  
<script setup>
  import { ref } from 'vue'
  import TaskForm from '@/components/TaskForm.vue'
  import TaskCard from '@/components/TaskCard.vue'
  
  const tasks = ref([])
  const editingTask = ref(null)
  const editingIndex = ref(null)
  
  const addTask = (task) => {
    tasks.value.push(task)
  }
  
  const deleteTask = (index) => {
    tasks.value.splice(index, 1)
  }

   const startEditTask = (task, index) => {
    editingTask.value = { ...task }
    editingIndex.value = index
  }

  const updateTask = (updatedTask) => {
    if (editingIndex.value !== null) {
      tasks.value[editingIndex.value] = { ...updatedTask }
      editingTask.value = null
      editingIndex.value = null
    }
  }
</script>
  