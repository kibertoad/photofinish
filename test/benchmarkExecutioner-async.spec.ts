import { BenchmarkBuilder } from '../lib/BenchmarkBuilder'
import { asyncDelay } from './utils/testUtils'
import { Measurement } from '../lib/Measurement'

describe('benchmarkExecutioner', () => {
  describe('async function under test', () => {
    it('benchmarks async function correctly', async () => {
      jest.setTimeout(20000)
      const testAsyncFn = async () => {
        return asyncDelay(100)
      }

      const benchmarkBuilder = new BenchmarkBuilder()
      const benchmark = benchmarkBuilder
        .name('Dummy name')
        .warmupCycles(25)
        .benchmarkCycles(5)
        .benchmarkCycleSamples(5)
        .asyncFunctionUnderTest(testAsyncFn)
        .build()

      const benchmarkResult = await benchmark.executeAsync()
      expect(benchmarkResult.meanTime).toBeInstanceOf(Measurement)
      // @ts-ignore
      expect(benchmarkResult.meanTime.getTimeInMilliSeconds()).toBeAround(100, 0)
    })
  })
})
