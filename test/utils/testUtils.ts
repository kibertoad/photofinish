export function asyncDelay(delayInMsecs: number): Promise<() => void> {
  return new Promise((resolve) => setTimeout(resolve, delayInMsecs))
}
