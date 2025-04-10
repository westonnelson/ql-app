import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create test leads
  const leads = [
    {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      dateOfBirth: new Date('1985-05-15'),
      gender: 'male',
      zipCode: '90210',
      height: '5\'10"',
      weight: '180',
      tobaccoUse: false,
      healthConditions: 'None',
      coverageAmount: 500000,
      coverageType: 'term',
      termLength: 20,
      monthlyBudget: 50,
      beneficiaryRelation: 'spouse',
      status: 'new',
      utmSource: 'google',
      utmMedium: 'cpc',
      utmCampaign: 'life-insurance',
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phone: '9876543210',
      dateOfBirth: new Date('1990-08-22'),
      gender: 'female',
      zipCode: '60601',
      height: '5\'6"',
      weight: '135',
      tobaccoUse: false,
      healthConditions: 'None',
      coverageAmount: 750000,
      coverageType: 'whole',
      monthlyBudget: 100,
      beneficiaryRelation: 'children',
      status: 'contacted',
      contactedAt: new Date(),
      utmSource: 'facebook',
      utmMedium: 'social',
      utmCampaign: 'family-protection',
    },
  ]

  for (const lead of leads) {
    await prisma.lead.create({
      data: lead,
    })
  }

  console.log('Database has been seeded with test data')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 