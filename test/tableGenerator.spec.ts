import { generateTable } from '../lib/tableGenerator'
import { TableData } from '../lib/resultsExporter'

describe('tableGenerator', () => {
  describe('generateTable', () => {
    it('generate correct table without version', async () => {
      const result: TableData = {
        runtimeVersion: '15.5.0, V8 8.6.395.17-node.23',
        benchmarkName: 'Dummy benchmark',
        benchmarkEntryName: 'Benchmark entry',
        meanTimeNs: 101744870,
        warmupCycles: 10,
        label: 'dummy',
        benchmarkCycleSamples: 50,
        benchmarkCycles: 100,
      }

      expect(generateTable([result])).toMatchSnapshot()
    })

    it('generate correct table with version', async () => {
      const result: TableData = {
        runtimeVersion: '10.23.0, V8 6.8.275.32-node.59',
        benchmarkName: 'Dummy benchmark',
        benchmarkEntryName: 'Dummy entry',
        benchmarkEntryVersion: '1.0.0',
        meanTimeNs: 101744870,
        warmupCycles: 10,
        label: 'dummy',
        benchmarkCycleSamples: 50,
        benchmarkCycles: 100,
      }

      expect(generateTable([result])).toMatchSnapshot()
    })
  })
})
