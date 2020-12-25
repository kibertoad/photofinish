import { generateTable } from '../lib/tableGenerator'
import { TableData } from '../lib/resultsExporter'
import { VALID_TABLE_DATA } from './fixtures/TableDataFixtures'

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

    it('generate correct table sorted by single field', async () => {
      const result: TableData[] = [
        { ...VALID_TABLE_DATA, meanTimeNs: 5500 },
        { ...VALID_TABLE_DATA, meanTimeNs: 6600 },
        { ...VALID_TABLE_DATA, meanTimeNs: 7700 },
        { ...VALID_TABLE_DATA, meanTimeNs: 8800 },
      ]

      expect(
        generateTable(result, { sortBy: { field: 'meanTimeNs', order: 'desc' } })
      ).toMatchSnapshot()
    })

    it('generate correct table sorted by multiple fields', async () => {
      const result: readonly TableData[] = [
        { ...VALID_TABLE_DATA, benchmarkEntryName: 'aaa', runtimeVersion: '111' },
        { ...VALID_TABLE_DATA, benchmarkEntryName: 'aaa', runtimeVersion: '222' },
        { ...VALID_TABLE_DATA, benchmarkEntryName: 'bbb', runtimeVersion: '111' },
        { ...VALID_TABLE_DATA, benchmarkEntryName: 'bbb', runtimeVersion: '222' },
      ]

      expect(
        generateTable(result, {
          sortBy: [
            { field: 'benchmarkEntryName', order: 'asc' },
            { field: 'runtimeVersion', order: 'desc' },
          ],
        })
      ).toMatchSnapshot()
    })
  })
})
