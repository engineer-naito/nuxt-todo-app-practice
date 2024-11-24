<script setup lang="ts">
const { data: todos, status, error, refresh } = await useFetch("/api/todos");

const newTodoTitle = ref("");
const pendingOrIdle = computed(() => status.value in ["pending", "idle"]);

const todoIdInEdit = ref<number | null>(null);
const todoTitleInEdit = ref<string | null>(null);

function startEdit(id: number, title: string) {
  todoIdInEdit.value = id;
  todoTitleInEdit.value = title;
};

function cancelEdit() {
  todoIdInEdit.value = null;
  todoTitleInEdit.value = null;
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    cancelEdit();
  }
};

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest(".todo-edit")) {
    cancelEdit();
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
  document.removeEventListener("click", handleClickOutside);
});

async function updateTodo(id: number) {
  if (!todoTitleInEdit.value?.trim()) {
    alert("タイトルを入力してください。");
    return;
  }

  try {
    await useFetch(`/api/todos/${id}`, {
      method: "PATCH",
      body: { title: todoTitleInEdit.value },
    });

    await refresh();
    cancelEdit();
  }
  catch (error) {
    console.error("Todo の更新に失敗しました。", error);
    alert("Todo の更新に失敗しました。");
  }
}

async function createTodo() {
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
        <div
          v-if="todoIdInEdit === todo.id"
          flex
          items-center
          gap-4
          class="todo-edit"
        >
          <input
            v-model="todoTitleInEdit"
            type="text"
            text-green
            max-w-xs
            flex-1
            focus:outline-none
            focus:text-green
          >
          <button
            p-2
            text-2xl
            bg-green
            text-white
            rounded
            hover:bg-green-500
            @click="updateTodo(todo.id)"
          >
            保存
          </button>
        </div>

        <template v-else>
          <span @dblclick="startEdit(todo.id, todo.title)">{{ todo.title }}</span>
        </template>
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
