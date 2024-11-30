<script setup lang="ts">
const todos = ["eat", "sleep", "rave"];

const { data: userProfile } = await useFetch("/api/userProfile", {
  method: "GET",
});
</script>

<template>
  <div>
    <h1>{{ userProfile?.displayName }}'s Todo</h1>
    <ul>
      <li
        v-for="todo in todos"
        :key="todo"
      >
        {{ todo }}
      </li>
    </ul>
  </div>
</template>
