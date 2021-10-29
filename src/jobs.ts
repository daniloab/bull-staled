import Queue from "bull";

import { config } from "./config";

export const queue = new Queue("named", config.REDIS_HOST);

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const JOBS = {
  SEND_MESSAGE: "SEND_MESSSAGE",
  DELAYED: "DELAYED",
};

export const jobs = {
  [JOBS.SEND_MESSAGE]: async (job: Job<{ message: string }>) => {
    // eslint-disable-next-line
    const { message } = job.data;

    // this implementation will break and returns the stable error
    while (true) {
      await delay(100);
    }
  },
  [JOBS.DELAYED]: (job: Job<{ message: string }>) => {
    const { message } = job.data;

    console.log("job delayed message: ", message);
  },
};
