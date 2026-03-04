"use server";

import { z } from "zod";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const ContactSchema = z.object({
    name: z.string().min(1, "Name is required").max(100),
    email: z.string().email("Valid email is required"),
    subject: z.string().min(1, "Subject is required").max(200),
    message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

export const submitContactForm = async (values: z.infer<typeof ContactSchema>) => {
    const validatedFields = ContactSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { name, email, subject, message } = validatedFields.data;

    if (!process.env.RESEND_API_KEY) {
        return { error: "Email service unavailable. Please try again later." };
    }

    try {
        await resend.emails.send({
            from: "Bitfoniz Contact <onboarding@resend.dev>",
            to: "support@bitfoniz.com",
            replyTo: email,
            subject: `[Contact Form] ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #3b82f6;">New Contact Form Submission</h2>
                    <p><strong>From:</strong> ${name} (${email})</p>
                    <p><strong>Subject:</strong> ${subject}</p>
                    <hr style="border-color: #e5e7eb;" />
                    <p>${message.replace(/\n/g, "<br>")}</p>
                </div>
            `,
        });

        return { success: "Message sent successfully! We'll get back to you soon." };
    } catch {
        return { error: "Failed to send message. Please try again later." };
    }
};
