<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

const todos = ["eat", "sleep", "rave"];

const { data: profile, error } = await useFetch("/api/profile", {
  method: "GET",
});

if (error) {
  console.error("Error fetching profile", error);
}
</script>

<template>
  <div>
    <h1
      text-8xl
      mb-4xl
    >
      {{ profile?.displayName }}'s Todos
    </h1>
    <ul text-4xl>
      <li
        v-for="todo in todos"
        :key="todo"
      >
        {{ todo }}
      </li>
    </ul>
  </div>
</template>
