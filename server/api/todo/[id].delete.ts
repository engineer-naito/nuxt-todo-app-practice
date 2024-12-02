import prisma from "~~/lib/prisma";

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Id is requried",
    });
  }

  const todoId = parseInt(id, 10);
  if (isNaN(todoId)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid id format",
    });
  }

  try {
    const deletedTodo = await prisma.todo.delete({
      where: { id: todoId },
    });

    return deletedTodo;
  }
  catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Faild to delete todo",
      data: error,
    });
  }
});
