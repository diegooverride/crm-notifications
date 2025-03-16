import { RedisOptions } from 'ioredis';

export const redisConfig: RedisOptions = {
  host: 'localhost', // Ou 'redis' se estiver usando Docker
  port: 6379,
};
