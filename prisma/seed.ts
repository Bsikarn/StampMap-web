import prisma from '../lib/prisma'

const MOCK_USER_ID = "user-123";

async function main() {
  console.log('Seeding database...')

  // Clean up existing data to prevent duplicates during testing
  await prisma.souvenirRedemption.deleteMany()
  await prisma.stamp.deleteMany()
  await prisma.review.deleteMany()
  await prisma.location.deleteMany()
  await prisma.mapZone.deleteMany()
  await prisma.souvenir.deleteMany()
  // 1. (Skip user creation - using existing demo user)


  // 2. Create Zones
  const jejuZone = await prisma.mapZone.create({
    data: {
      name: "Jeju Island",
      isActive: true
    }
  })

  const thailandZone = await prisma.mapZone.create({
    data: {
      name: "Thailand",
      isActive: true
    }
  })

  // 3. Create Locations (3 per country)
  const jejuLocations = await Promise.all([
    prisma.location.create({
      data: {
        zoneId: jejuZone.id,
        name: "Hallasan Mountain",
        koreanName: "한라산",
        description: "The highest peak in South Korea.",
        latitude: 33.3617,
        longitude: 126.5292,
      }
    }),
    prisma.location.create({
      data: {
        zoneId: jejuZone.id,
        name: "Seongsan Ilchulbong",
        koreanName: "성산 일출봉",
        description: "UNESCO World Heritage sunrise peak.",
        latitude: 33.4586,
        longitude: 126.9422,
      }
    }),
    prisma.location.create({
      data: {
        zoneId: jejuZone.id,
        name: "Manjanggul Cave",
        koreanName: "만장굴",
        description: "One of the finest lava tunnels in the world.",
        latitude: 33.5284,
        longitude: 126.7716,
      }
    })
  ])

  const thaiLocations = await Promise.all([
    prisma.location.create({
      data: {
        zoneId: thailandZone.id,
        name: "Wat Phra Kaew",
        koreanName: "왓 프라깨우",
        description: "Temple of the Emerald Buddha in Bangkok.",
        latitude: 13.7516,
        longitude: 100.4926,
      }
    }),
    prisma.location.create({
      data: {
        zoneId: thailandZone.id,
        name: "Doi Suthep",
        koreanName: "도이 수텝",
        description: "A famous temple on a mountain in Chiang Mai.",
        latitude: 18.8050,
        longitude: 98.9214,
      }
    }),
    prisma.location.create({
      data: {
        zoneId: thailandZone.id,
        name: "Phuket Old Town",
        koreanName: "푸เก็ต 올드 타운",
        description: "Historical town with Sino-Portuguese architecture.",
        latitude: 7.8804,
        longitude: 98.3923,
      }
    })
  ])

  // 4. Create Stamps for Mock User (1 for Jeju, 1 for Thailand just to show progress)
  // Or create all 3? The prompt says "3 stamp per country too" maybe just the places for it. 
  // We'll leave stamps empty so they can be collected, or collect a few. Let's not collect all so the user can test.
  
  // 5. Create Souvenirs
  await prisma.souvenir.createMany({
    data: [
      {
        name: "Secret Souvenir",
        image: "🎁",
        stampsRequired: 3,
      },
      {
        name: "Elephant Statue",
        image: "🐘",
        stampsRequired: 3,
      },
      {
        name: "Jeju Notebook",
        image: "📓",
        stampsRequired: 3,
      },
      {
        name: "Thailand Keychain",
        image: "🔑",
        stampsRequired: 3,
      }
    ]
  })

  console.log('Database seeded successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
