import dotenv from "dotenv";

dotenv.config({ path: "config.env" });

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_EMAIL_API);

export const sendEmail = async (options) => {
  const { data, error } = await resend.emails.send({
    from: "ShopEase <onboarding@resend.dev>",
    to: options.to,
    subject: options.subject,
    html: options.message,
  });
  if (error) {
    console.log("Email error:", error);
    return;
  }
  console.log(data);
};
