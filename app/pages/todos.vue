<script setup lang="ts">
const todos = ["eat", "sleep", "rave"];
</script>

<template>
  <ul>
    <li
      v-for="todo in todos"
      :key="todo"
    >
      {{ todo }}
    </li>
  </ul>
</template>
