// test-db.js
import { PrismaClient } from '@prisma/client'

console.log('DATABASE_URL:', process.env.DATABASE_URL)

const prisma = new PrismaClient()

async function test() {
  try {
    await prisma.$connect()
    console.log('✅ Connected to database successfully!')
  } catch (error) {
    console.error('❌ Failed to connect:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

test()