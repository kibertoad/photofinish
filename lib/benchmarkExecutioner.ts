import { Benchmark, FunctionType } from './BenchmarkBuilder'

export type BenchmarkResults = {
  avgTime: number
}

async function warmupAsync(warmupCycles: number, functionUnderTest: FunctionType) {
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

  return {
    avgTime: 0,
  }
}

export async function executeBenchmarkAsync(benchmark: Benchmark): Promise<BenchmarkResults> {
  if (!benchmark.asyncFunctionUnderTest) {
    throw new Error('Async function under test is not set')
  }
  await warmupAsync(benchmark.warmupCycles, benchmark.asyncFunctionUnderTest)

  return {
    avgTime: 0,
  }
}
