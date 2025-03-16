import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { redisConfig } from '../config/redis.config';

const emailQueue = new Queue('emailQueue', {
  connection: redisConfig,
});

@Injectable()
export class NotificationsService {
  async sendEmail(to: string, subject: string, text: string) {
    await emailQueue.add('sendEmail', { to, subject, text });
  }
}
