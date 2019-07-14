
import { TimerTask, Task } from "./timerTask";

export class TimeoutTask extends TimerTask {

  constructor(task: Task, timeout: number) {
    super(task, timeout, window.setTimeout, window.clearTimeout);
  }

}
