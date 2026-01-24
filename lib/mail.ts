import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const sendWelcomeEmail = async (email: string, fullName: string) => {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY is missing. Skipping email sending.");
    return;
  }

  await resend.emails.send({
    from: "Vantix Support <onboarding@resend.dev>", // Note: Use 'onboarding@resend.dev' for testing without a domain
    to: email,
    subject: "Welcome to Vantix Protocol 🚀",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #020617; color: #ffffff; padding: 40px; border-radius: 10px;">
        <h1 style="color: #3b82f6; text-transform: uppercase; letter-spacing: 2px;">Vantix.</h1>
        
        <h2 style="font-size: 24px; margin-top: 30px;">Welcome aboard, ${fullName}!</h2>
        
        <p style="color: #94a3b8; line-height: 1.6;">
          We are thrilled to enable your access to the Vantix Decentralized Protocol. Your account has been successfully provisioned.
        </p>

        <div style="background-color: #0f172a; padding: 20px; border-left: 4px solid #3b82f6; margin: 30px 0;">
          <p style="margin: 0; color: #e2e8f0; font-weight: bold;">
            "The future of automated trading is now in your hands."
          </p>
        </div>

        <p style="color: #94a3b8; margin-bottom: 30px;">
          You can now deposit assets, monitor plans, and withdraw your earnings directly from your dashboard.
        </p>

        <a href="${domain}/login" style="display: inline-block; background-color: #3b82f6; color: #ffffff; padding: 15px 30px; border-radius: 8px; text-decoration: none; font-weight: bold; text-transform: uppercase; font-size: 14px;">
          Access Dashboard
        </a>

        <hr style="border-color: #1e293b; margin-top: 40px;" />
        
        <p style="color: #64748b; font-size: 12px; text-align: center;">
          © ${new Date().getFullYear()} Vantix Protocol. All rights reserved.
        </p>
      </div>
    `
  });
};

export const sendDepositApprovedEmail = async (email: string, fullName: string, amount: string, currency: string) => {
  if (!process.env.RESEND_API_KEY) return;

  await resend.emails.send({
    from: "Vantix Support <payments@resend.dev>",
    to: email,
    subject: "Deposit Approved 💰",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #020617; color: #ffffff; padding: 40px; border-radius: 10px;">
        <h1 style="color: #10b981; text-transform: uppercase; letter-spacing: 2px;">Payment Received</h1>
        
        <p>Hello ${fullName},</p>
        
        <p style="font-size: 18px;">
          Your deposit of <strong style="color: #10b981;">${amount} ${currency}</strong> has been successfully confirmed and added to your balance.
        </p>

        <p style="color: #94a3b8;">
          You can now use these funds to activate an investment protocol.
        </p>

        <a href="${domain}/dashboard/investments" style="display: inline-block; background-color: #10b981; color: #020617; padding: 15px 30px; border-radius: 8px; text-decoration: none; font-weight: bold; text-transform: uppercase; font-size: 14px; margin-top: 20px;">
          Invest Now
        </a>
      </div>
    `
  });
};

export const sendWithdrawalApprovedEmail = async (email: string, fullName: string, amount: string, currency: string) => {
  if (!process.env.RESEND_API_KEY) return;

  await resend.emails.send({
    from: "Vantix Support <payments@resend.dev>",
    to: email,
    subject: "Withdrawal Sent 💸",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #020617; color: #ffffff; padding: 40px; border-radius: 10px;">
        <h1 style="color: #3b82f6; text-transform: uppercase; letter-spacing: 2px;">Funds On The Way</h1>
        
        <p>Hello ${fullName},</p>
        
        <p style="font-size: 18px;">
          Your withdrawal request for <strong>${amount} ${currency}</strong> has been processed.
        </p>

        <p style="color: #94a3b8;">
          The funds have been sent to your designated wallet address.
        </p>
      </div>
    `
  });
};

export const sendInvestmentEmail = async (email: string, fullName: string, planName: string, amount: string) => {
  if (!process.env.RESEND_API_KEY) return;

  await resend.emails.send({
    from: "Vantix Support <invest@resend.dev>",
    to: email,
    subject: "Investment Protocol Activated 🚀",
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #020617; color: #ffffff; padding: 40px; border-radius: 10px;">
      <h1 style="color: #3b82f6; text-transform: uppercase; letter-spacing: 2px;">Protocol Activated</h1>
      
      <p>Hello ${fullName},</p>
      
      <p style="font-size: 18px;">
        Your investment into the <strong style="color: #3b82f6;">${planName} Strategy</strong> has been successfully deployed.
      </p>

      <div style="background-color: #0f172a; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #1e293b;">
        <div style="display: flex; justify-between; margin-bottom: 10px;">
          <span style="color: #94a3b8;">Principal:</span>
          <span style="color: #ffffff; font-weight: bold; margin-left: auto;">$${amount}</span>
        </div>
        <div style="display: flex; justify-between;">
          <span style="color: #94a3b8;">Status:</span>
          <span style="color: #3b82f6; font-weight: bold; margin-left: auto;">ACTIVE</span>
        </div>
      </div>

      <p style="color: #94a3b8;">
        Your yield is being generated and will be automatically credited to your balance upon cycle completion.
      </p>

      <a href="${domain}/dashboard/investments" style="display: inline-block; background-color: #3b82f6; color: #ffffff; padding: 15px 30px; border-radius: 8px; text-decoration: none; font-weight: bold; text-transform: uppercase; font-size: 14px; margin-top: 20px;">
        View Portfolio
      </a>
    </div>
  `
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/new-password?token=${token}`;

  console.log("Attempting to send reset email to:", email);
  if (!process.env.RESEND_API_KEY) {
    console.error("❌ RESEND_API_KEY is missing in environment variables!");
    return;
  }

  try {
    const data = await resend.emails.send({
      from: "Vantix Support <security@resend.dev>",
      to: email,
      subject: "Reset your VANTIX password",
      html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
                <div style="background-color: #020617; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                    <h1 style="color: #ffffff; margin: 0; font-family: 'Arial Black', sans-serif; letter-spacing: -2px;">VANTIX<span style="color: #2563eb;">.</span></h1>
                </div>
                <div style="background-color: #ffffff; padding: 40px; border-radius: 0 0 10px 10px;">
                    <h2 style="color: #1a1a1a; margin-top: 0;">Reset Password Request</h2>
                    <p style="color: #555555; line-height: 1.6;">We received a request to reset your password for the VANTIX Secure Protocol.</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${resetLink}" style="background-color: #2563eb; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px; display: inline-block;">Secure Reset Link</a>
                    </div>
                    <p style="color: #555555; font-size: 13px;">Or copy and paste this link into your browser:</p>
                    <p style="background-color: #f0f2f5; padding: 10px; border-radius: 4px; word-break: break-all; font-size: 12px; color: #555;">${resetLink}</p>
                    <p style="color: #999999; font-size: 12px; margin-top: 30px;">If you did not request this change, please ignore this email. This link will expire in 1 hour.</p>
                </div>
                <div style="text-align: center; padding: 20px; color: #999999; font-size: 11px;">
                    &copy; ${new Date().getFullYear()} Vantix Protocol. All System Rights Reserved.
                </div>
            </div>
        `
    });
    console.log("✅ Email sent successfully:", data);
    return data;
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw error;
  }
};
