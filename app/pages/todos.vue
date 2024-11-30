<script setup lang="ts">
const { data: userProfile } = await useFetch("/api/userProfile", {
  pick: ["displayName"],
  method: "GET",
});

const { data: todos } = await useFetch("/api/todo", {
  method: "GET",
});
</script>

<template>
  <div
    flex="~ col"
    gap-8
  >
    <h1 text-6xl>
      <span text-green>{{ userProfile?.displayName }}</span>'s Todo
    </h1>
    <ul>
      <li
        v-for="todo in todos"
        :key="`todo-${todo.id}`"
        text-4xl
      >
        {{ todo.title }}
      </li>
    </ul>
  </div>
</template>
