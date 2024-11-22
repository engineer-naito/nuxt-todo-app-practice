export default defineEventHandler(async () => {
  const todos = await prisma.todo.findMany();
  return todos;
});
