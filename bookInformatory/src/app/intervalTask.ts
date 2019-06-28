
export class IntervalTask {

  public readonly interval: number;
  private intervalRef: number = 0;

  private taskFn: () => void;

  constructor(taskFn: () => void, interval = 5e3) {

    this.interval = interval;
    this.taskFn = taskFn;

  }

  run(runImmediatly = false) {

    if (runImmediatly) {
      this.taskFn();
    }

    this.intervalRef =
      window.setInterval(this.taskFn, this.interval);

  }

  runOnce() {
    this.taskFn();
  }

  pause() {
    window.clearInterval(this.intervalRef);
  }

}
