import { BenchmarkBuilder } from '../../lib/BenchmarkBuilder'
import { Measurement } from '../../lib/Measurement'
import { BenchmarkResults } from '../../lib/internal/benchmarkExecutioner'
import { generateTable } from '../../lib/internal/tableGenerator'

function sleep(ms: number): Promise<any> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

describe('tableGenerator', () => {
  describe('generateTable', () => {
    it('generate correct table', async () => {
      const benchmark = new BenchmarkBuilder()
        .benchmarkName('Dummy benchmark')
        .warmupCycles(1)
        .benchmarkCycles(10)
        .benchmarkCycleSamples(1)
        .asyncFunctionUnderTest(() => sleep(100))
        .build()

      const result: BenchmarkResults = {
        benchmarkName: 'Dummy benchmark',
        benchmarkEntryName: 'Benchmark entry',
        meanTime: new Measurement(101744870),
      }

      expect(generateTable(benchmark, [result])).toMatchSnapshot()
    })
  })
})
