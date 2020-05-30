import { BenchmarkBuilder } from '../lib/BenchmarkBuilder'

describe('BenchmarkBuilder', () => {
  it('creates correct benchmark instance', () => {
    const benchmarkBuilder = new BenchmarkBuilder()

    const benchmark = benchmarkBuilder
      .name('Dummy name')
      .warmupCycles(500)
      .benchmarkCycles(44)
      .benchmarkCycleSamples(55)
      .functionUnderTest(() => {})

    expect(benchmark).toMatchSnapshot()
  })
})
