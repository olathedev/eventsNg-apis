import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'vance.durgan14@ethereal.email',
        pass: 'kZJbD28vmNnp4Xq4Sq'
    }
});

const sendEmail = async () => {
    try {
        const info = await transporter.sendMail({
            from: '"Ola from eventsNg" <michealojedeji2@gmail.com>', // sender address
            to: "olapademicheal3@gmail.com", // list of receivers
            subject: "Account Verification", // Subject line
            html: "<b>Heres your email verification link</b>", // html body
        })

        console.log("Message sent: %s", info.messageId);

    } catch (error) {

        console.log(error.message);

    }
}

sendEmail()