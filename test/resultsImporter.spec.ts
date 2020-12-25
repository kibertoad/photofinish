import { exportResults } from '../lib/resultsExporter'
import { loadResults } from '../lib/resultsImporter'
import { BenchmarkResults } from '../lib/internal/benchmarkExecutioner'
import { FileTestHelper } from 'cli-testlab'
import { Measurement } from '../lib/Measurement'

const exportPath = `${__dirname}/results`

const nodeVersion = process.versions.node
const nodeText = `${nodeVersion.slice(0, 2)}`

describe('resultsImporter', () => {
  describe('loadResults', () => {
    it('successfully loads benchmark results from files', async () => {
      const fileTestHelper = new FileTestHelper()
      const results: BenchmarkResults = {
        benchmarkName: 'Benchmark',
        benchmarkEntryVersion: '1.0.0',
        benchmarkEntryName: 'Benchmark_entry',
        meanTime: new Measurement(450),
        warmupCycles: 10,
        label: 'dummy',
        benchmarkCycleSamples: 50,
        benchmarkCycles: 100,
      }
      exportResults(results, {
        exportPath,
      })
      const results2: BenchmarkResults = {
        benchmarkName: 'Benchmark',
        benchmarkEntryVersion: '1.0.5',
        benchmarkEntryName: 'Benchmark_entry_2',
        meanTime: new Measurement(600),
        warmupCycles: 10,
        label: 'dummy',
        benchmarkCycleSamples: 50,
        benchmarkCycles: 100,
      }
      exportResults(results2, {
        exportPath,
      })

      const expectedFilePath = `${exportPath}/${results.benchmarkName}-${results.benchmarkEntryName}-Node_${nodeText}-dummy.json`
      expect(fileTestHelper.fileExists(expectedFilePath)).toBe(true)
      const expectedFilePath2 = `${exportPath}/${results2.benchmarkName}-${results2.benchmarkEntryName}-Node_${nodeText}-dummy.json`
      expect(fileTestHelper.fileExists(expectedFilePath2)).toBe(true)

      const loadResult = await loadResults(exportPath)
      loadResult.forEach((entry) => {
        expect(entry.runtimeVersion).toBeDefined()
        entry.runtimeVersion = '10.23.0, V8 6.8.275.32-node.59'
      })
      expect(loadResult).toMatchSnapshot()

      fileTestHelper.deleteDir(exportPath)
    })
  })
})
