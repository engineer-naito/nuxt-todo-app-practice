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
  if (editedTitle.value.trim() && editedTitle.value !== props.todo.title) {
    emit("update", editedTitle.value.trim());
  }
  emit("stop-edit");
}

onMounted(() => {
  if (props.todo.isEditing && editInput.value) {
    editInput.value.focus();
  }
});
</script>

<template>
  <li class="flex items-center gap-4 p-4 hover:bg-gray-50">
    <input
      type="checkbox"
      :checked="todo.done"
      class="w-5 h-5 border-gray-300 accent-green"
      @change="$emit('toggle')"
      @dblclick="startEdit"
    >

    <template v-if="todo.isEditing">
      <div class="flex flex-1 gap-2">
        <input
          ref="editInput"
          v-model.trim="editedTitle"
          class="flex-1 px-3 py-2 border-0 focus:ring-0 focus:outline-none"
          autofocus
          @keyup.enter="saveEdit"
          @keyup.esc="$emit('stop-edit')"
          @blur="saveEdit"
        >
        <button
          class="px-4 py-2 text-gray-400 bg-gray-100 rounded cursor-not-allowed"
          disabled
        >
          Edit
        </button>
        <button
          class="px-4 py-2 text-white bg-green rounded hover:bg-green-500 transition-colors"
          @click="saveEdit"
        >
          Save
        </button>
      </div>
    </template>

    <template v-else>
      <span
        :class="{ 'line-through text-gray-400': todo.done }"
        class="flex-1 px-3 py-2"
        @dblclick="startEdit"
      >
        {{ todo.title }}
      </span>
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
  </li>
</template>
