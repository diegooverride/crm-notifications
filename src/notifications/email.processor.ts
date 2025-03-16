import { Worker } from 'bullmq';
import nodemailer from 'nodemailer';
import { redisConfig } from '../config/redis.config';

const worker = new Worker(
  'emailQueue',
  async (job) => {
    const { to, subject, text } = job.data;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });

    console.log(`Email enviado para ${to}`);
  },
  { connection: redisConfig }
);

worker.on('failed', (job, err) => {
  console.error(`Erro ao enviar e-mail para ${job.data.to}: ${err.message}`);
});
