import 'dotenv/config'
import prisma from '../lib/prisma'

async function main() {
  try {
    console.log('Fetching souvenirs...')
    const souvenirs = await prisma.souvenir.findMany()
    console.log('Success:', souvenirs.length, 'souvenirs found')
  } catch (err) {
    console.error('Error fetching souvenirs:', err)
  } finally {
    await prisma.$disconnect()
  }
}

main()
