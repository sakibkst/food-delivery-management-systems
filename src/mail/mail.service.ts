// mail.service.ts
import { Injectable } from '@nestjs/common';;
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'sakibkst38@gmail.com',
                pass: 'jxkv lxbv rwfe jtud',
            },
        });
    }
    async sendMail(mailOptions: any): Promise<any> {
        try {
            await this.transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error: ', error);
                } else {
                    console.log('Email sent: ', info.response);
                }
            });
        } catch (error) {
            console.error('Error while sending email: ', error);
        }
    }

    async sendPasswordResetMail(email: string, resetUrl: string): Promise<void> {
        const mailOptions = {
            from: 'sakibkst38@gmail.com',
            to: email,
            subject: 'Password Reset Request',
            html: `<p>To reset your password, click <a href="${resetUrl}">here</a>.</p>`,
        };

        await this.transporter.sendMail(mailOptions);
    }

}
