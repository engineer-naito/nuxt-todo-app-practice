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

    <ul
      v-else
      w-full
      max-w-md
      space-y-2
      text-4xl
    >
      <li
        v-for="todo in todos"
        :key="todo.id"
      >
        {{ todo.title }}
      </li>

      <li>
        <form
          flex
          gap-4
          @submit.prevent="createTodo"
        >
          <input
            v-model="newTodoTitle"
            type="text"
            placeholder="new Todo"
            flex-1
            max-w-xs
            focus:outline-none
            focus:text-green
          >
          <button
            type="submit"
            p-2
            bg-green
            text-white
            rounded
            text-2xl
            hover:bg-green-500
          >
            追加
          </button>
        </form>
      </li>
    </ul>
  </div>
</template>
