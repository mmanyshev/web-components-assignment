
export type Task = () => void;
export type TaskRunner = (handler: TimerHandler, timeout: number) => number;
export type TaskCleaner = (taskRunnerRef: number) => void;

export class TimerTask {

  public readonly timeout: number;

  private taskRunnerRef: number = 0;
  private readonly taskRunner: TaskRunner;
  private readonly taskCleaner: TaskCleaner;

  private readonly task: Task;

  constructor(
    task: Task,
    timeout = 5e3,
    taskRunner: TaskRunner,
    taskCleaner: TaskCleaner,
  ) {

    this.task = task;
    this.timeout = timeout;
    this.taskRunner = taskRunner;
    this.taskCleaner = taskCleaner;

  }

  get isRunning() {
    return this.taskRunnerRef > 0;
  }

  run(runImmediatly = false) {

    if (this.isRunning) {
      this.reset();
    }

    if (runImmediatly) {
      this.task();
    }

    this.taskRunnerRef =
      this.taskRunner.call(window, this.task, this.timeout);

  }

  runOnce() {
    this.task();
  }

  reset() {
    this.taskCleaner.call(window, this.taskRunnerRef);
  }

}
