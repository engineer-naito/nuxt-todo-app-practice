import prisma from "~~/lib/prisma";
import { serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  const { title } = await readBody<{ title: string }>(event);

  if (!title || title.trim() === "") {
    throw createError({
      statusCode: 400,
      statusMessage: "Todo title is required",
    });
  }

  try {
    const newTodo = await prisma.todo.create({
      data: {
        title: title.trim(),
        userId: user.id,
      },
    });
    return newTodo;
  }
  catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create todos",
      data: error,
    });
  }
});
