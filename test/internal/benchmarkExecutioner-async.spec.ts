import { BenchmarkBuilder } from '../../lib/BenchmarkBuilder'
import { asyncDelay } from '../utils/testUtils'
import { Measurement } from '../../lib/Measurement'

describe('benchmarkExecutioner', () => {
  describe('async function under test', () => {
    it('benchmarks async function correctly', async () => {
      jest.setTimeout(20000)
      const testAsyncFn = async () => {
        return asyncDelay(100)
      }

      const benchmarkBuilder = new BenchmarkBuilder()
      const benchmark = benchmarkBuilder
        .benchmarkName('Dummy name')
        .warmupCycles(25)
        .benchmarkCycles(5)
        .benchmarkCycleSamples(5)
        .asyncFunctionUnderTest(testAsyncFn)
        .build()

      const benchmarkResult = await benchmark.executeAsync()
      expect(benchmarkResult.meanTime).toBeInstanceOf(Measurement)
      // @ts-ignore
      expect(benchmarkResult.meanTime.getTimeInMilliSeconds()).toHavePercentageDifference(100, 10)
    })

    it('throws an error if wrong function is set', () => {
      const benchmarkBuilder = new BenchmarkBuilder()
      const benchmark = benchmarkBuilder
        .benchmarkName('Dummy name')
        .warmupCycles(500)
        .benchmarkCycles(44)
        .benchmarkCycleSamples(55)
        .functionUnderTest(() => {})
        .build()

      expect(() => {
        benchmark.executeAsync()
      }).toThrow(/Function under test is synchronous, use execute\(\) instead/)
    })
  })
})
