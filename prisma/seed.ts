import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const users = await Promise.all(
    ["Taro", "Hanako", "John"].map(async (name, index) => {
      return prisma.user.create({
        data: {
          email: `${name.toLocaleLowerCase()}${index}@example.com`,
          name: name,
        },
      });
    }),
  );

  console.log("Users created", users);

  for (const user of users) {
    const todos = await prisma.todo.createMany({
      data: [
        {
          title: "eat",
          description: "ramen, hamburger, and sushi",
          userId: user.id,
        },
        {
          title: "sleep",
          description: "more than 10 hours",
          userId: user.id,
        },
        {
          title: "rave",
          userId: user.id,
        },
      ],
    });

    console.log(`Todos created for ${user.name}`, todos);
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
