export interface Todo {
  id: number;
  title: string;
  done: boolean;
  isEditing: boolean;
}

export default function () {
  const todos = ref<Todo[]>([]);

  const fetchTodos = async () => {
    try {
      const data = await $fetch<Todo[]>("/api/todo", { method: "GET" });
      todos.value = data.map(todo => ({ ...todo, isEditing: false }));
    }
    catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  };

  const addTodo = async (title: string) => {
    try {
      const newTodo = await $fetch<Todo>("/api/todo", {
        method: "POST",
        body: { title },
      });
      todos.value.push({ ...newTodo, isEditing: false });
    }
    catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  const updateTodo = async (todo: Todo) => {
    try {
      const { isEditing, ...todoData } = todo;
      const updated = await $fetch<Todo>(`/api/todo/${todo.id}`, {
        method: "PATCH",
        body: todoData,
      });
      const index = todos.value.findIndex(t => t.id === todo.id);
      if (index !== -1) {
        todos.value[index] = { ...updated, isEditing: false };
      }
    }
    catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await $fetch(`/api/todo/${id}`, { method: "DELETE" });
      todos.value = todos.value.filter(todo => todo.id !== id);
    }
    catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  const startEditing = (id: number) => {
    todos.value = todos.value.map(todo => ({ ...todo, isEditing: todo.id === id }));
  };

  const stopEditing = (id: number) => {
    const todo = todos.value.find(todo => todo.id === id);
    if (todo) {
      todo.isEditing = false;
    }
  };

  return {
    todos,
    fetchTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    startEditing,
    stopEditing,
  };
};
