import mg from "mailgun-js";
import {config} from "../config.js";

const mailgun = mg({
    apiKey: config.MAILGUN_API_KEY,
    domain: config.MAILGUN_DOMAIN
})

export const sentMail = async (options) => {
    const {to, subject, html} = options;

    const mailOptions = {
        from: `MyWeddingPlanner.lk <${config.EMAIL_FROM}>`,
        to: to,
        subject: subject,
        html: html,
    }

    await mailgun.messages().send(mailOptions, (error) => {
        if (error) {
            throw error;
        }
    })
}

