import { AsyncFunctionType, Benchmark, FunctionType } from '../BenchmarkBuilder'
import { Measurement } from '../Measurement'
import { filterSignificantSamples, calculateMean } from './mathUtils'

export type BenchmarkResults = {
  benchmarkName: string
  benchmarkEntryName: string
  benchmarkEntryVersion?: string
  meanTime: Measurement
  warmupCycles: number
  benchmarkCycles: number
  benchmarkCycleSamples: number
  label?: string
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

function processResults(benchmark: Benchmark, significantSamples: number[]): BenchmarkResults {
  const meanTime = calculateMean(significantSamples)

  return {
    benchmarkName: benchmark.benchmarkName,
    benchmarkEntryName: benchmark.benchmarkEntryName,
    benchmarkEntryVersion: benchmark.benchmarkEntryVersion,
    warmupCycles: benchmark.warmupCycles,
    benchmarkCycles: benchmark.benchmarkCycles,
    benchmarkCycleSamples: benchmark.benchmarkCycleSamples,
    label: benchmark.label,
    meanTime: new Measurement(meanTime),
  }
}

export function executeBenchmarkSync(benchmark: Benchmark): BenchmarkResults {
  warmup(benchmark.warmupCycles, benchmark.functionUnderTest!)

  // Perform all cycles
  const significantSamples: number[] = []
  for (let i = 0; i < benchmark.benchmarkCycles; i++) {
    // Perform full cycle
    const samples = []
    for (let i = 0; i < benchmark.benchmarkCycleSamples; i++) {
      const hrStart = process.hrtime()
      benchmark.functionUnderTest!()
      const hrEnd = process.hrtime(hrStart)
      const [, timeTakenInNanoSeconds] = hrEnd
      samples.push(timeTakenInNanoSeconds)
    }
    const significantCycleSamples = filterSignificantSamples(samples)
    significantSamples.push(...significantCycleSamples)
  }

  return processResults(benchmark, significantSamples)
}

export async function executeBenchmarkAsync(benchmark: Benchmark): Promise<BenchmarkResults> {
  await warmupAsync(benchmark.warmupCycles, benchmark.asyncFunctionUnderTest!)

  // Perform all cycles
  const significantSamples = []
  for (let i = 0; i < benchmark.benchmarkCycles; i++) {
    // Perform full cycle
    const samples = []
    for (let i = 0; i < benchmark.benchmarkCycleSamples; i++) {
      const hrStart = process.hrtime()
      await benchmark.asyncFunctionUnderTest!()
      const hrEnd = process.hrtime(hrStart)
      const [, timeTakenInNanoSeconds] = hrEnd
      samples.push(timeTakenInNanoSeconds)
    }
    const significantCycleSamples = filterSignificantSamples(samples)
    significantSamples.push(...significantCycleSamples)
  }

  return processResults(benchmark, significantSamples)
}
