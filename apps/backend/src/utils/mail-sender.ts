import type { Transporter, SendMailOptions } from 'nodemailer';
import nodemailer from 'nodemailer';

const mailSender = async (email: string, title: string, body: string) => {
	const transporter: Transporter = nodemailer.createTransport({
		service: process.env['MAIL_HOST'],
		auth: {
			user: process.env['MAIL_USER'],
			pass: process.env['MAIL_PASS'],
		},
	});

	const mailOptions: SendMailOptions = {
		from: 'www.ecomnow.com',
		to: email,
		subject: title,
		html: body,
	};

	const info = await transporter.sendMail(mailOptions);

	return info;
};

export default mailSender;
