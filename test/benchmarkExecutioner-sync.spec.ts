import { BenchmarkBuilder } from '../lib/BenchmarkBuilder'
import { Measurement } from '../lib/Measurement'

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
      expect(benchmarkResult.meanTime).toBeInstanceOf(Measurement)
      // @ts-ignore
      expect(benchmarkResult.meanTime.getTimeInMilliSeconds()).toBeAround(0, 1)
    })
  })
})
