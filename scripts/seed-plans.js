require('dotenv').config();
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
            name: 'BEGINNER',
            roiPercent: 90, // 6% * 15h
            cycleHours: 15,
            minDeposit: 50,
            maxDeposit: 499,
        },
        {
            name: 'BEGINNERS PRO',
            roiPercent: 160, // 8% * 20h
            cycleHours: 20,
            minDeposit: 500,
            maxDeposit: 1499,
        },
        {
            name: 'PROFESSIONAL',
            roiPercent: 264, // 11% * 24h
            cycleHours: 24,
            minDeposit: 1500,
            maxDeposit: 14999,
        },
        {
            name: 'EXPERT BUSINESS',
            roiPercent: 936, // 26% * 36h
            cycleHours: 36,
            minDeposit: 15000,
            maxDeposit: 100000000, // Unlimited
        },
        {
            name: 'PROMO',
            roiPercent: 50, // 10% * 5h
            cycleHours: 5,
            minDeposit: 2500,
            maxDeposit: 6000,
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
