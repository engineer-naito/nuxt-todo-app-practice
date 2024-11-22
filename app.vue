<script setup lang="ts">
const { data: todos, status, error } = await useFetch("/api/todos");
</script>

<template>
  <div
    flex="~ col"
    items-center
    justify-center
    h-screen
    gap-4xl
  >
    <h1 text-8xl>
      Todos
    </h1>
    <div v-if="status === 'pending'">
      Loading...
    </div>
    <div v-else-if="error">
      Error: {{ error.message }}
    </div>
    <ul v-else>
      <li
        v-for="todo in todos"
        :key="todo.id"
        text-4xl
      >
        {{ todo.title }}
      </li>
    </ul>
  </div>
</template>
