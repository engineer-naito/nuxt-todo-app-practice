import prisma from "~~/lib/prisma";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = await readBody(event);

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Id is required",
    });
  }

  const todoId = parseInt(id, 10);
  if (isNaN(todoId) || todoId <= 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid id format",
    });
  }

  if (!body || Object.keys(body).length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "No data to update",
    });
  }

  try {
    const updatedTodo = await prisma.todo.update({
      where: { id: todoId },
      data: body,
    });

    return updatedTodo;
  }
  catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to update todo",
      data: error,
    });
  }
});
