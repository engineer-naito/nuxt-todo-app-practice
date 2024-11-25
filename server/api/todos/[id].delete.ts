export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "ID は必須です。",
    });
  }

  try {
    const todoId = parseInt(id, 10);
    if (isNaN(todoId)) {
      throw createError({
        statusCode: 400,
        statusMessage: "ID が不正です。",
      });
    }

    const deleteTodo = await prisma.todo.delete({
      where: { id: todoId },
    });

    return {
      status: "success",
      data: deleteTodo,
    };
  }
  catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Todo の削除に失敗しました。",
      data: error,
    });
  }
});
