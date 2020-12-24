import { generateTable } from '../lib/tableGenerator'
import { TableData } from "../lib/resultsExporter";

describe('tableGenerator', () => {
  describe('generateTable', () => {
    it('generate correct table without version', async () => {
      const result: TableData = {
        runtimeVersion: 'Dummy version',
        benchmarkName: 'Dummy benchmark',
        benchmarkEntryName: 'Benchmark entry',
        meanTimeNs: 101744870,
      }

      expect(generateTable([result])).toMatchSnapshot()
    })

    it('generate correct table with version', async () => {
      const result: TableData = {
        runtimeVersion: 'Dummy version',
        benchmarkName: 'Dummy benchmark',
        benchmarkEntryName: 'Dummy entry',
        benchmarkEntryVersion: '1.0.0',
        meanTimeNs: 101744870,
      }

      expect(generateTable([result])).toMatchSnapshot()
    })
  })
})
