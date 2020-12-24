import { types } from 'util'
import {
  BenchmarkResults,
  executeBenchmarkAsync,
  executeBenchmarkSync,
} from './internal/benchmarkExecutioner'

export type FunctionType = () => any
export type AsyncFunctionType = () => Promise<any>

export type Benchmark = {
  benchmarkName: string // What problem are we benchmarking, e. g. sorting
  benchmarkEntryName: string // What solution are we benchmarking, e. g. bubble sort
  benchmarkEntryVersion?: string
  nodeVersion: string
  warmupCycles: number // How many times function will be run before benchmarking starts in order to allow Node.js to perform optimizations
  benchmarkCycles: number // How many execution cycles are executed in order to collect samples
  benchmarkCycleSamples: number // How many samples per cycle are generated. Note that samples below 15 and above 85 percentile are discarded as insignificant
  functionUnderTest: FunctionType | undefined
  asyncFunctionUnderTest: AsyncFunctionType | undefined
  execute: () => BenchmarkResults
  executeAsync: () => Promise<BenchmarkResults>
}

export class BenchmarkBuilder {
  private _benchmarkName = 'Benchmark'
  private _benchmarkEntryName = 'Benchmark entry'
  private _benchmarkEntryVersion?: string
  private _warmupCycles = 1000
  private _benchmarkCycles = 20000
  private _benchmarkCycleSamples = 100
  private _functionUnderTest: (() => any) | undefined
  private _asyncFunctionUnderTest: (() => Promise<any>) | undefined

  benchmarkName(name: string): BenchmarkBuilder {
    this._benchmarkName = name
    return this
  }

  benchmarkEntryName(name: string): BenchmarkBuilder {
    this._benchmarkEntryName = name
    return this
  }

  benchmarkEntryVersion(version: string): BenchmarkBuilder {
    this._benchmarkEntryVersion = version
    return this
  }

  warmupCycles(warmupCycles: number): BenchmarkBuilder {
    this._warmupCycles = warmupCycles
    return this
  }

  benchmarkCycles(benchmarkCycles: number): BenchmarkBuilder {
    this._benchmarkCycles = benchmarkCycles
    return this
  }

  benchmarkCycleSamples(benchmarkCycleSamples: number): BenchmarkBuilder {
    this._benchmarkCycleSamples = benchmarkCycleSamples
    return this
  }

  functionUnderTest(
    functionUnderTest: FunctionType,
    isPromiseResultAllowed = false
  ): BenchmarkBuilder {
    if (this._asyncFunctionUnderTest) {
      throw new Error(
        'asyncFunctionUnderTest is already set, please only set one of asyncFunctionUnderTest and functionUnderTest'
      )
    }

    const sanityCheckResult = functionUnderTest()
    if (!isPromiseResultAllowed && isPromise(sanityCheckResult)) {
      throw new Error(
        `Please use .asyncFunctionUnderTest() method for benchmarking async functions. If you are sure about what you are doing and don't want to await returned promise within benchmark, please set "isPromiseResultAllowed" parameter to true`
      )
    }

    this._functionUnderTest = functionUnderTest
    return this
  }

  asyncFunctionUnderTest(asyncFunctionUnderTest: AsyncFunctionType): BenchmarkBuilder {
    if (this._functionUnderTest) {
      throw new Error(
        'functionUnderTest is already set, please only set one of asyncFunctionUnderTest and functionUnderTest'
      )
    }

    this._asyncFunctionUnderTest = asyncFunctionUnderTest
    return this
  }

  build(): Benchmark {
    if (!this._asyncFunctionUnderTest && !this._functionUnderTest) {
      throw new Error('Either asyncFunctionUnderTest or functionUnderTest needs to bet set.')
    }

    const benchmark: Benchmark = {
      nodeVersion: process.versions.node,
      benchmarkName: this._benchmarkName,
      benchmarkEntryName: this._benchmarkEntryName,
      warmupCycles: this._warmupCycles,
      benchmarkCycles: this._benchmarkCycles,
      benchmarkCycleSamples: this._benchmarkCycleSamples,
      asyncFunctionUnderTest: this._asyncFunctionUnderTest,
      functionUnderTest: this._functionUnderTest,
      execute: () => {
        throw new Error('Function under test is asynchronous, use executeAsync() instead.')
      },
      executeAsync: () => {
        throw new Error('Function under test is synchronous, use execute() instead.')
      },
    }

    if (benchmark.functionUnderTest) {
      benchmark.execute = (): BenchmarkResults => {
        return executeBenchmarkSync(benchmark)
      }
    }

    if (benchmark.asyncFunctionUnderTest) {
      benchmark.executeAsync = (): Promise<BenchmarkResults> => {
        return executeBenchmarkAsync(benchmark)
      }
    }

    return benchmark
  }
}

function isPromise(value: any): boolean {
  return types.isPromise(value)
}
