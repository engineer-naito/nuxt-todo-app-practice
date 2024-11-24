<script setup lang="ts">
const { data: todos, status, error, refresh } = await useFetch("/api/todos");

const newTodoTitle = ref("");
const pendingOrIdle = computed(() => status.value in ["pending", "idle"]);

const createTodo = async () => {
  if (!newTodoTitle.value.trim()) {
    alert("タイトルを入力してください");
    return;
  }

  try {
    const { data: createdTodo } = await useFetch("/api/todos", {
      method: "POST",
      body: { title: newTodoTitle.value },
    });

    if (createdTodo.value) {
      todos.value = [...(todos.value || []), createdTodo.value];
    }
    newTodoTitle.value = "";
    refresh();
  }
  catch (err) {
    alert("Todoの作成に失敗しました");
    console.error(err);
  }
};
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

    <div v-if="pendingOrIdle">
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

    <form
      class="mt-8"
      @submit.prevent="createTodo"
    >
      <input
        v-model="newTodoTitle"
        type="text"
        placeholder="新しいTodoを入力"
        class="p-2 border rounded"
        text-2xl
      >
      <button
        type="submit"
        class="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        text-2xl
      >
        追加
      </button>
    </form>
  </div>
</template>
