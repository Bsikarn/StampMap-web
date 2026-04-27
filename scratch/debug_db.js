const { PrismaClient } = require('@prisma/client')
const { Pool } = require('pg')
const { PrismaPg } = require('@prisma/adapter-pg')
require('dotenv').config()

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  try {
    console.log('--- Zones ---')
    const zones = await prisma.mapZone.findMany()
    console.log(JSON.stringify(zones, null, 2))

    console.log('\n--- Locations ---')
    const locations = await prisma.location.findMany({ include: { zone: true }, take: 2 })
    console.log(JSON.stringify(locations, null, 2))

    console.log('\n--- Souvenirs ---')
    const souvenirs = await prisma.souvenir.findMany()
    console.log(JSON.stringify(souvenirs, null, 2))
  } catch (e) {
    console.error('ERROR:', e.message || e)
  } finally {
    await prisma.$disconnect()
  }
}

main()

