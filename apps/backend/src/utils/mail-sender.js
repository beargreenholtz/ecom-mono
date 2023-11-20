import nodemailer from 'nodemailer';
const mailSender = async (email, title, body) => {
    try {
        const transporter = nodemailer.createTransport({
            service: process.env['MAIL_HOST'],
            auth: {
                user: process.env['MAIL_USER'],
                pass: process.env['MAIL_PASS'],
            },
        });
        const mailOptions = {
            from: 'www.ecomnow.com',
            to: email,
            subject: title,
            html: body,
        };
        const info = await transporter.sendMail(mailOptions);
        return info;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
export default mailSender;
