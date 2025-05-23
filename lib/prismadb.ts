import {PrismaClient} from "@prisma/client"

// declare global {
//     let prisma: PrismaClient | undefined
// }

const globalThis = global as unknown as { prisma: PrismaClient }

const prismadb = globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb

export default prismadb