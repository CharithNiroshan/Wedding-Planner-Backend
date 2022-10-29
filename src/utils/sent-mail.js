import mg from "mailgun-js";
import dotenv from "dotenv";

dotenv.config({path: "config.env"});

const mailgun = mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
})

export const sentMail = async (options) => {
    const {to, subject, html} = options;

    const mailOptions = {
        from: `MyWeddingPlanner.lk <${process.env.EMAIL_FROM}>`,
        to: to,
        subject: subject,
        html: html,
    }

    return await mailgun.messages().send(mailOptions);
}

