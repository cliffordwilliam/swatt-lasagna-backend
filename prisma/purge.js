import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// Ensure this script only runs in development environment
if (process.env.NODE_ENV !== 'development') {
  console.log("This script can only be run in a development environment.");
  process.exit(0);  // Exit the script if not in development
}

(async () => {
  try {
    // This script should only be run in development

    // This one references the last generated schema
    const tables = Prisma.dmmf.datamodel.models.map(
      (model) => model.dbName || model.name,
    );

    // Using Prisma transaction API takes too long
    for (const table of tables) {
      console.log(`Dropping table: ${table}`);
      // Use raw query to drop the table
      await prisma.$executeRawUnsafe(
        `DROP TABLE IF EXISTS "${table}" CASCADE;`,
      );
    }
  } catch (error) {
    console.error(
      "Error occurred while fetching tables or dropping tables:",
      error,
    );
  } finally {
    await prisma.$disconnect();
    console.log("All specified tables have been dropped.");
  }
})();
