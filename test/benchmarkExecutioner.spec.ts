import { BenchmarkBuilder } from '../lib/BenchmarkBuilder'
import { asyncDelay } from './utils/testUtils'
import { Measurement } from '../lib/Measurement'

expect.extend({
  toBeAround(actual: number, expected: number, precision = 2) {
    const pass = Math.abs(expected - actual) < Math.pow(10, -precision) / 2
    if (pass) {
      return {
        message: () => `expected ${actual} not to be around ${expected}`,
        pass: true,
      }
    } else {
      return {
        message: () => `expected ${actual} to be around ${expected}`,
        pass: false,
      }
    }
  },
})

describe('benchmarkExecutioner', () => {
  describe('sync function under test', () => {
    it('benchmarks sync function correctly', () => {
      const testFn = () => {}

      const benchmarkBuilder = new BenchmarkBuilder()
      const benchmark = benchmarkBuilder
        .name('Dummy name')
        .warmupCycles(500)
        .benchmarkCycles(44)
        .benchmarkCycleSamples(55)
        .functionUnderTest(testFn)
        .build()

      const benchmarkResult = benchmark.execute()
      expect(benchmarkResult.avgTime).toBeInstanceOf(Measurement)
      // @ts-ignore
      expect(benchmarkResult.avgTime.getTimeInMilliSeconds()).toBeAround(0, 1)
    })
  })

  describe('async function under test', () => {
    it('benchmarks async function correctly', async () => {
      const testAsyncFn = async () => {
        return asyncDelay(100)
      }

      const benchmarkBuilder = new BenchmarkBuilder()
      const benchmark = benchmarkBuilder
        .name('Dummy name')
        .warmupCycles(2)
        .benchmarkCycles(5)
        .benchmarkCycleSamples(5)
        .asyncFunctionUnderTest(testAsyncFn)
        .build()

      const benchmarkResult = await benchmark.executeAsync()
      expect(benchmarkResult.avgTime).toBeInstanceOf(Measurement)
      // @ts-ignore
      expect(benchmarkResult.avgTime.getTimeInMilliSeconds()).toBeAround(100, 0)
    })
  })
})
