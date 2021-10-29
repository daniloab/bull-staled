import { queue, JOBS } from "../src/jobs";
import * as moment from "moment/moment";

(async () => {
  try {
    const job = await queue.add(JOBS.SEND_MESSAGE, {
      message: "name bull job",
    });

    const exactlyDate = moment.utc().add(10, "minute").toDate();

    const now = moment.utc().toDate();

    const delay = exactlyDate - now;

    const job2 = await queue.add(
      JOBS.DELAYED,
      {
        message: "name bull job delayed",
      },
      {
        delay,
      }
    );

    // eslint-disable-next-line
    console.log({
      job,
      job2,
    });
  } catch (err) {
    console.log("err: ", err);
  }

  process.exit(0);
})();
