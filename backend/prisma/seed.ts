import { prisma } from '../src/config/db';



async function main() {
  await prisma.category.createMany({
    data: [
      { name: "Electronics" },
      { name: "Fashion" },
      { name: "Books" },
      { name: "Grocery" },
      { name: "Beauty" },
      { name: "Sports" },
      { name: "Home Appliances" },
      { name: "Toys" },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(() => {
    console.log("Categories inserted.");
  })
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });