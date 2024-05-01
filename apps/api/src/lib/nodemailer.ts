import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    service: "google",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAIL_SENDER,
        pass: process.env.MAIL_APP_SENDER
    }
})