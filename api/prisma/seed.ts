import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.category.createMany({
    data: [
      { name: "Food" },
      { name: "Rent" },
      { name: "Transport" },
      { name: "Shopping" },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Categories seeded");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
