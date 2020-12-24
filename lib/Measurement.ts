export class Measurement {
  private readonly timeInNanoSeconds: number
  constructor(timeInNanoSeconds: number) {
    this.timeInNanoSeconds = timeInNanoSeconds
  }

  getTimeInNanoSeconds(): number {
    return this.timeInNanoSeconds
  }

  getTimeInMilliSeconds(): number {
    return this.timeInNanoSeconds / 1000000
  }

  getTextInMsecs(precision = 3): string {
    return `${this.getTimeInMilliSeconds().toFixed(precision)} msecs`
  }

  getOpsPerSec(): number {
    return 1000000000 / this.getTimeInNanoSeconds()
  }

  getTextOpsPerSec(): string {
    return this.getOpsPerSec().toFixed(3)
  }
}
