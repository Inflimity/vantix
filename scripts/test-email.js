require('dotenv').config();
const { Resend } = require('resend');

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
    console.error("❌ RESEND_API_KEY is missing from process.env");
    console.log("Make sure you have a .env file with RESEND_API_KEY=...");
    process.exit(1);
}

const resend = new Resend(apiKey);

async function main() {
    console.log("Attempting to send test email with key:", apiKey.substring(0, 5) + "...");
    try {
        const data = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: process.argv[2] || 'test@example.com', // User passes email as arg
            subject: 'Test Email from Vantix Debugger',
            html: '<p>If you see this, your API Key works!</p>'
        });

        if (data.error) {
            console.error("❌ Resend API returned error:", data.error);
        } else {
            console.log("✅ Email queued successfully!", data);
            console.log("Check your inbox at:", process.argv[2] || 'test@example.com');
        }
    } catch (error) {
        console.error("❌ Critical Error sending email:", error);
    }
}

main();
