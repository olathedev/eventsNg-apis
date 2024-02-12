import nodemailer from "nodemailer"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import dotenv from "dotenv"

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: process.env.MY_EMAIL,
        pass: process.env.APP_PASSWORD
    },
});


const deliverMail = async (username, email, verificationToken) => {

    const templatePath = path.join(__dirname, 'verificationMail.html');
    const htmlContent = fs.readFileSync(templatePath, 'utf-8');
    const emailContent = htmlContent.replace('{{verificationLink}}', `https://events-ng.vercel.app/verify?token=${verificationToken}`).replace('{{username}}', username);

    const info = await transporter.sendMail({
        from: '"Gladys from EventsNg ✨" <olapademicheal3@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Email Confirmation", // Subject line
        html: emailContent, // html body
    });

    return info
}


export default deliverMail

// console.log(process.env.APP_PASSWORD, process.env.MY_EMAIL);
