import { AsyncFunctionType, Benchmark, FunctionType } from '../BenchmarkBuilder'
import { Measurement } from '../Measurement'
import { filterSignificantSamples, calculateMean } from './mathUtils'

export type BenchmarkResults = {
  benchmarkName: string
  benchmarkEntryName: string
  meanTime: Measurement
}

async function warmupAsync(warmupCycles: number, functionUnderTest: AsyncFunctionType) {
  for (let i = 0; i < warmupCycles; i++) {
    await functionUnderTest()
  }
}

function warmup(warmupCycles: number, functionUnderTest: FunctionType) {
  for (let i = 0; i < warmupCycles; i++) {
    functionUnderTest()
  }
}

export function executeBenchmarkSync(benchmark: Benchmark): BenchmarkResults {
  if (!benchmark.functionUnderTest) {
    throw new Error('Function under test is not set')
  }
  warmup(benchmark.warmupCycles, benchmark.functionUnderTest)

  // Perform all cycles
  const significantSamples = []
  for (let i = 0; i < benchmark.benchmarkCycles; i++) {
    // Perform full cycle
    const samples = []
    for (let i = 0; i < benchmark.benchmarkCycleSamples; i++) {
      const hrStart = process.hrtime()
      benchmark.functionUnderTest()
      const hrEnd = process.hrtime(hrStart)
      const [, timeTakenInNanoSeconds] = hrEnd
      samples.push(timeTakenInNanoSeconds)
    }
    const significantCycleSamples = filterSignificantSamples(samples)
    significantSamples.push(...significantCycleSamples)
  }

  const meanTime = calculateMean(significantSamples)

  return {
    benchmarkName: benchmark.benchmarkName,
    benchmarkEntryName: benchmark.benchmarkEntryName,
    meanTime: new Measurement(meanTime),
  }
}

export async function executeBenchmarkAsync(benchmark: Benchmark): Promise<BenchmarkResults> {
  if (!benchmark.asyncFunctionUnderTest) {
    throw new Error('Async function under test is not set')
  }
  await warmupAsync(benchmark.warmupCycles, benchmark.asyncFunctionUnderTest)

  // Perform all cycles
  const significantSamples = []
  for (let i = 0; i < benchmark.benchmarkCycles; i++) {
    // Perform full cycle
    const samples = []
    for (let i = 0; i < benchmark.benchmarkCycleSamples; i++) {
      const hrStart = process.hrtime()
      await benchmark.asyncFunctionUnderTest()
      const hrEnd = process.hrtime(hrStart)
      const [, timeTakenInNanoSeconds] = hrEnd
      samples.push(timeTakenInNanoSeconds)
    }
    const significantCycleSamples = filterSignificantSamples(samples)
    significantSamples.push(...significantCycleSamples)
  }

  const meanTime = calculateMean(significantSamples)

  return {
    benchmarkName: benchmark.benchmarkName,
    benchmarkEntryName: benchmark.benchmarkEntryName,
    meanTime: new Measurement(meanTime),
  }
}
