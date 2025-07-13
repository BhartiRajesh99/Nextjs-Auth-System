import nodemailer from "nodemailer";
import brcyptjs from "bcryptjs";
import User from "@/models/userModel";

export default async function sendEmail({ email, emailType, userId }: any) {
  try {
    const hashedToken = await brcyptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });

    const mailOptions = {
      from: "admin@gmail.com",
      to: email,
      subject: emailType === "VERIFY" ? "Verify Email" : "Reset Your Password",
      html: `<p>
      Click 
      <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}&emailtype=${emailType}">here</a> 
      to
      ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } or copy paste the link below <br> ${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}&emailtype=${emailType}</p>`,
    };
    const mailResponse = await transport.sendMail(mailOptions);
    
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
