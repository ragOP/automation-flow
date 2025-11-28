import { Queue } from "bullmq";
import IORedis from "ioredis";

import { ENV } from "../config/env";

const connection = new IORedis(ENV.REDIS_URL as string, {
  maxRetriesPerRequest: null,
  tls: {
    rejectUnauthorized: false
  }
});


export const horoscopeQueue = new Queue("horoscopeQueue", { connection });