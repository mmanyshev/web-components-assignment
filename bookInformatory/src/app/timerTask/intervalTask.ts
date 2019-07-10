
import { TimerTask, Task } from "./timerTask";

export class IntervalTask extends TimerTask {

  constructor(task: Task, interval: number) {
    super(task, interval, window.setInterval, window.clearInterval);
  }

}
