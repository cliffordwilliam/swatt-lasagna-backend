import { PrismaClient } from '@prisma/client';

// Singleton pattern for Prisma client to prevent multiple instances
const prismaClientSingleton = () => new PrismaClient();

// Use global variable for non-production environments
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma;
}

export { prisma };
