const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Clearing old data (related to investments)...');
    // Delete in order to satisfy foreign key constraints
    await prisma.investment.deleteMany();
    await prisma.investmentPlan.deleteMany();

    console.log('Seeding Investment Plans from User Specifications...');

    const plans = [
        {
            name: 'STARTER PLAN',
            roiPercent: 120, // 6% * 20 hours
            cycleHours: 20,
            minDeposit: 1,
            maxDeposit: 10000,
        },
        {
            name: 'PREMIUM PLAN',
            roiPercent: 160, // 4% * 40h
            cycleHours: 40,
            minDeposit: 5,
            maxDeposit: 10000,
        },
        {
            name: 'ADVANCED PLAN',
            roiPercent: 200, // 20% * 10h
            cycleHours: 10,
            minDeposit: 450,
            maxDeposit: 10000,
        },
        {
            name: 'VIP PLAN',
            roiPercent: 200, // 40% * 5h
            cycleHours: 5,
            minDeposit: 400,
            maxDeposit: 10000,
        }
    ];

    for (const plan of plans) {
        await prisma.investmentPlan.create({
            data: plan
        });
    }

    console.log('✅ Seed successful!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
