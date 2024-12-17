// mail.module.ts
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';

@Module({
    providers: [MailService],
    exports: [MailService],  // Export the service to be used in other modules
})
export class MailModule { }
