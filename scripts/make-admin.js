/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const email = process.argv[2];

if (!email) {
    console.log('Please provide an email address.');
    console.log('Usage: node scripts/make-admin.js <email>');
    process.exit(1);
}

async function main() {
    try {
        const user = await prisma.user.update({
            where: { email },
            data: { role: 'ADMIN' },
        });
        console.log(`✅ Success! User ${user.email} is now an ADMIN.`);
    } catch (error) {
        if (error.code === 'P2025') {
            console.error(`❌ Error: User with email ${email} not found.`);
        } else {
            console.error('❌ An unexpected error occurred:', error);
        }
    } finally {
        await prisma.$disconnect();
    }
}

main();
