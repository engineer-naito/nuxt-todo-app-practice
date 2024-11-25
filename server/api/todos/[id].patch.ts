export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  const body = await readBody(event);

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "ID は必須です。",
    });
  }

  if (!body || Object.keys(body).length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "更新データがありません。",
    });
  }

  try {
    const todoId = parseInt(id, 10);
    if (isNaN(todoId)) {
      throw createError({
        statusCode: 400,
        statusMessage: "ID のフォーマットが不正です。",
      });
    }

    const updatedTodo = await prisma.todo.update({
      where: { id: todoId },
      data: body,
    });

    return {
      status: "success",
      data: updatedTodo,
    };
  }
  catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Todo の更新に失敗しました。",
      data: error,
    });
  }
});
