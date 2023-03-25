/* eslint-disable no-console */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function userSeed() {
  const found = await prisma.user.findFirst()

  if (found) return

  await prisma.user.create({
    data: {
      id: '641b16c92e3a54c71a80db5c',
      uuid: '06a4c49e-4659-485d-b656-247c58a21605',
      email: 'admin@mail.com',
      password: '$2b$10$GQtDOkAybsuKHasCS99V7uPG86CHvmtn0hqFfIre6YIhbCAmm1PSC',
    },
  })
}

async function bookSeed() {
  const found = await prisma.book.findFirst()

  if (found) return

  await prisma.book.createMany({
    data: [{
      id: '641b9ab9e22b4e7aaf548b90',
      uuid: 'c788a92f-9254-414e-806a-1ad2b7a4b863',
      title: 'Object-oriented Software Construction',
      author: 'Bertrand Meyer',
      summary: 'The comprehensive reference on all aspects of object technology.',
    }, {
      id: '641b9ac3b0ffeb5fa5271c18',
      uuid: '0cb208d9-2c32-404d-8adb-45a194a73fe6',
      title: 'Object Oriented Software Engineering: A Use Case Driven Approach',
      author: 'Ivar Jacobson',
      summary: 'This book is based on Objectory. An extensible industrial process for building large systems.',
    }],
  })
}

async function rentalSeed() {
  const found = await prisma.rental.findFirst()

  if (found) return

  await prisma.rental.create({
    data: {
      id: '641b9d221a1554cda570bc74',
      uuid: '3f3faa5e-8939-4fa3-929b-3e2e791e5987',
      userID: '641b16c92e3a54c71a80db5c',
      bookID: '641b9ab9e22b4e7aaf548b90',
      rentedAt: new Date('2023-03-22'),
    },
  })
}

async function main() {
  await Promise.all([
    userSeed(),
    bookSeed(),
  ])
  await rentalSeed()
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
