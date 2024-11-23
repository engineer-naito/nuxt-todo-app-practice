export default defineEventHandler(async (event) => {
  const body = await readBody<{ title: string }>(event);
  const { title } = body;

  if (!title || title.trim() === "") {
    throw createError({
      statusCode: 400,
      statusMessage: "Todo 内容は必須です。",
    });
  }

  const newTodo = await prisma.todo.create({
    data: {
      title: title.trim(),
      userId: Math.floor(Math.random() * 3) + 1, // TODO: 適切な user の id を登録する
    },
  });

  return newTodo;
});
