import { BenchmarkBuilder } from '../lib/BenchmarkBuilder'

describe('BenchmarkBuilder', () => {
  it('creates correct benchmark instance', () => {
    const benchmarkBuilder = new BenchmarkBuilder()

    const benchmark = benchmarkBuilder
      .benchmarkName('Dummy name')
      .benchmarkEntryName('Only entry')
      .warmupCycles(500)
      .benchmarkCycles(44)
      .benchmarkCycleSamples(55)
      .functionUnderTest(() => {})

    expect(benchmark).toMatchSnapshot()
  })

  it('does not allow to set asyncFunctionUnderTest if functionUnderTest is set', () => {
    const benchmarkBuilder = new BenchmarkBuilder()

    expect(() => {
      benchmarkBuilder
        .benchmarkName('Dummy name')
        .benchmarkEntryName('Only entry')
        .warmupCycles(500)
        .benchmarkCycles(44)
        .benchmarkCycleSamples(55)
        .functionUnderTest(() => {})
        .asyncFunctionUnderTest(() => Promise.resolve())
    }).toThrow(/functionUnderTest is already set/)
  })

  it('does not allow to set functionUnderTest if asyncFunctionUnderTest is set', () => {
    const benchmarkBuilder = new BenchmarkBuilder()

    expect(() => {
      benchmarkBuilder
        .benchmarkName('Dummy name')
        .benchmarkEntryName('Only entry')
        .warmupCycles(500)
        .benchmarkCycles(44)
        .benchmarkCycleSamples(55)
        .asyncFunctionUnderTest(() => Promise.resolve())
        .functionUnderTest(() => {})
    }).toThrow(/asyncFunctionUnderTest is already set/)
  })
})
