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

  try {
    const todos = await prisma.todo.findMany({
      where: { userId: user.id },
    });
    return todos;
  }
  catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to get todos",
      data: error,
    });
  }
});
