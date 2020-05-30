export class Measurement {
  private timeInNanoSeconds: number
  constructor(timeInNanoSeconds: number) {
    this.timeInNanoSeconds = timeInNanoSeconds
  }

  getTimeInNanoSeconds(): number {
    return this.timeInNanoSeconds
  }

  getTimeInMilliSeconds(): number {
    return this.timeInNanoSeconds / 1000000
  }

  getTextInMsecs(): string {
    return `${this.getTimeInMilliSeconds()} msecs`
  }
}
