import { Measurement } from '../lib/Measurement'
import { BenchmarkResults } from '../lib/internal/benchmarkExecutioner'
import { generateTable } from '../lib/tableGenerator'

function sleep(ms: number): Promise<any> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

describe('tableGenerator', () => {
  describe('generateTable', () => {
    it('generate correct table without version', async () => {
      const result: BenchmarkResults = {
        benchmarkName: 'Dummy benchmark',
        benchmarkEntryName: 'Benchmark entry',
        meanTime: new Measurement(101744870),
      }

      expect(generateTable([result])).toMatchSnapshot()
    })

    it('generate correct table with version', async () => {
      const result: BenchmarkResults = {
        benchmarkName: 'Dummy benchmark',
        benchmarkEntryName: 'Dummy entry',
        benchmarkEntryVersion: '1.0.0',
        meanTime: new Measurement(101744870),
      }

      expect(generateTable([result])).toMatchSnapshot()
    })
  })
})
