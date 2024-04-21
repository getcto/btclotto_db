import { PrismaClient } from '@prisma/client';


// initialize Prisma Client

const prisma = new PrismaClient();


async function main() {

  // create two dummy articles
    // const user1 = await prisma.user.upsert({
    //     create: {
    //         username: 'alice',
    //         twitter_handle: '@alice',
    //         wallet_address: '0x1234567890abcdef',
    //     },
    //     where: { username: 'alice' },
    //     update: {}
    // });

    // const user2 = await prisma.user.upsert({
    //     create: {
    //         username: 'bob',
    //         twitter_handle: '@bob',
    //         wallet_address: '0xabcdef1234567890',
    //     },
    //     where: { username: 'bob' },
    //     update: {}
    // });

    const user_entries = await prisma.user_entries.upsert({
        where: { id: 2},
        create: 
            {
                user: { connect: { id: 2 } },
                sessionId: "2",
                selected_number: "8",
                total_ticket: "1",
                total_amount: 0.1,
                type: 'Super'
            },
          
        update: {}
    });
        

}


// execute the main function

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {

    // close Prisma Client at the end
    await prisma.$disconnect();
  });

