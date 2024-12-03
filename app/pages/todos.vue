<script setup lang="ts">
const { data: userProfile } = await useFetch("/api/userProfile", {
  pick: ["displayName"],
  method: "GET",
});

const {
  todos,
  addTodo,
  updateTodo,
  deleteTodo,
  startEditing,
  stopEditing,
} = useTodos();

const { data: fetchedTodos } = await useFetch("/api/todo", {
  method: "GET",
  transform: (data: Todo[]) => data.map(todo => ({ ...todo, isEditing: false })),
  headers: useRequestHeaders(["cookie"]),
});

if (fetchedTodos.value) {
  todos.value = fetchedTodos.value;
}

const scrollToBottom = (element: HTMLUListElement | null): void => {
  if (element) {
    element.scrollTop = element.scrollHeight;
  }
};

const todosUl = useTemplateRef("todosUl");

onMounted(async () => {
  await nextTick();
  scrollToBottom(todosUl.value);
});

watch(todos, () => {
  nextTick(() => {
    scrollToBottom(todosUl.value);
  });
}, { deep: true });
</script>

<template>
  <div class="flex flex-col items-center gap-8">
    <h1 text-6xl>
      {{ userProfile?.displayName }}<span text-green>'</span>s Todo
    </h1>
    <ul
      ref="todosUl"
      overflow-y-auto
      max-h-120
      divide-y
      divide-gray-100
      lg:min-w-4xl
      md:min-w-3xl
      sm:min-w-2xl
    >
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo
        @update="(title) => updateTodo({ ...todo, title })"
        @delete="deleteTodo(todo.id)"
        @toggle="updateTodo({ ...todo, done: !todo.done })"
        @start-edit="startEditing(todo.id)"
        @stop-edit="stopEditing(todo.id)"
      />
      <TodoInput @add="addTodo" />
    </ul>
  </div>
</template>
