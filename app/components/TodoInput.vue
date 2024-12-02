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
  <TodoRow>
    <template #checkbox>
      <!-- Spacer -->
      <span class="w-5 h-5" />
    </template>
    <template #content>
      <input
        v-model="newTodo"
        placeholder="New Todo"
        class="flex-1 px-3 py-2 border-0 focus:ring-0 outline-none bg-inherit hover:bg-inherit"
        @keyup.enter="addTodo"
      >
    </template>
    <template #actions>
      <button
        class="btn-p text-white bg-green rounded hover:bg-green-500 transition-colors"
        @click="addTodo"
      >
        Add
      </button>
    </template>
  </TodoRow>
</template>
