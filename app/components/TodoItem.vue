<script setup lang="ts">
import type { Todo } from "~/composables/useTodos";

const props = defineProps<{ todo: Todo }>();
const emit = defineEmits<{
  "update": [value: string];
  "delete": [];
  "toggle": [];
  "start-edit": [];
  "stop-edit": [];
}>();

const editedTitle = ref(props.todo.title);
const editInput = ref<HTMLInputElement | null>(null);

watch(() => props.todo.title, (newTitle) => {
  editedTitle.value = newTitle;
});

function startEdit() {
  editedTitle.value = props.todo.title;
  emit("start-edit");
}

function saveEdit() {
  const trimmed = editedTitle.value.trim();
  if (trimmed && trimmed !== props.todo.title) {
    emit("update", trimmed);
  }
  emit("stop-edit");
}
</script>

<template>
  <TodoRow>
    <template #checkbox>
      <input
        type="checkbox"
        :checked="todo.done"
        class="w-5 h-5 border-gray-300 accent-green"
        @change="$emit('toggle')"
      >
    </template>
    <template #content>
      <template v-if="todo.isEditing">
        <input
          ref="editInput"
          v-model.trim="editedTitle"
          class="flex-1 px-3 py-2 border-0 bg-gray-50 focus:ring-0 outline-none"
          @keyup.enter="saveEdit"
          @keyup.esc="$emit('stop-edit')"
        >
      </template>
      <template v-else>
        <span
          :class="{ 'line-through text-gray-400': todo.done }"
          class="px-3 py-2"
          @dblclick="startEdit"
        >
          {{ todo.title }}
        </span>
      </template>
    </template>
    <template #actions>
      <template v-if="todo.isEditing">
        <button
          class="px-4 py-2 text-gray-400 bg-gray-100 rounded cursor-not-allowed"
          disabled
        >
          Editing
        </button>
        <button
          class="px-4 py-2 text-white bg-green rounded hover:bg-green-500 transition-colors"
          @click="saveEdit"
        >
          Save
        </button>
      </template>
      <template v-else>
        <button
          class="px-4 py-2 text-white bg-green rounded hover:bg-green-500 transition-colors"
          @click="startEdit"
        >
          Edit
        </button>
        <button
          class="px-4 py-2 text-white bg-red rounded hover:bg-red-500 transition-colors"
          @click="$emit('delete')"
        >
          Delete
        </button>
      </template>
    </template>
  </TodoRow>
</template>
