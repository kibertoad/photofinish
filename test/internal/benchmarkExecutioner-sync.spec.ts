import { BenchmarkBuilder } from '../../lib/BenchmarkBuilder'
import { Measurement } from '../../lib/Measurement'

describe('benchmarkExecutioner', () => {
  describe('sync function under test', () => {
    it('benchmarks sync function correctly', () => {
      const testFn = () => {}

      const benchmarkBuilder = new BenchmarkBuilder()
      const benchmark = benchmarkBuilder
        .benchmarkName('Dummy name')
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

    it('throws an error if wrong function is set', () => {
      const benchmarkBuilder = new BenchmarkBuilder()
      const benchmark = benchmarkBuilder
        .benchmarkName('Dummy name')
        .warmupCycles(500)
        .benchmarkCycles(44)
        .benchmarkCycleSamples(55)
        .asyncFunctionUnderTest(async () => {})
        .build()

      expect(() => {
        benchmark.execute()
      }).toThrow(/Function under test is asynchronous, use executeAsync\(\) instead/)
    })
  })
})
