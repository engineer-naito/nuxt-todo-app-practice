<script setup lang="ts">
const emit = defineEmits<{ add: [value: string] }>();

const newTodo = ref("");

function addTodo() {
  const trimmed = newTodo.value.trim();
  if (trimmed) {
    emit("add", trimmed);
    newTodo.value = "";
  }
}
</script>

<template>
  <li
    flex
    items-center
    gap-4
    rounded
    p-4
    hover:bg-gray-50
    transition-colors
  >
    <span class="w-5 h-5" />
    <input
      v-model="newTodo"
      placeholder="New Todo"
      flex-1
      p="x-3 y-2"
      border-0
      focus:="ring-0 outline-none"
      bg-inherit
      hover:bg-inherit
      @keyup.enter="addTodo"
    >
    <button
      p="x-4 y-2"
      rounded
      text-white
      bg-green
      hover:bg-green-500
      transition-colors
      @click="addTodo"
    >
      Add
    </button>
  </li>
</template>
