import { exportResults } from '../lib/resultsExporter'
import { loadResults } from '../lib/resultsImporter'
import { BenchmarkResults } from '../lib/internal/benchmarkExecutioner'
import { FileTestHelper } from 'cli-testlab'
import { Measurement } from '../lib/Measurement'

const exportPath = `${__dirname}/results`

const nodeVersion = process.versions.node
const filename = `${nodeVersion.slice(0, 2)}.json`

describe('resultsImporter', () => {
  describe('loadResults', () => {
    it('successfully loads benchmark results from files', async () => {
      const fileTestHelper = new FileTestHelper()
      const results: BenchmarkResults = {
        benchmarkName: 'Benchmark',
        benchmarkEntryVersion: '1.0.0',
        benchmarkEntryName: 'Benchmark entry',
        meanTime: new Measurement(450),
      }
      exportResults(results, {
        exportPath,
      })
      const results2: BenchmarkResults = {
        benchmarkName: 'Benchmark',
        benchmarkEntryVersion: '1.0.5',
        benchmarkEntryName: 'Benchmark entry 2',
        meanTime: new Measurement(600),
      }
      exportResults(results2, {
        exportPath,
      })

      const expectedFilePath = `${exportPath}/benchmark/benchmark_entry/${results.benchmarkName}-${results.benchmarkEntryName}-Node_${filename}`
      expect(fileTestHelper.fileExists(expectedFilePath)).toBe(true)
      const expectedFilePath2 = `${exportPath}/benchmark/benchmark_entry_2/${results2.benchmarkName}-${results2.benchmarkEntryName}-Node_${filename}`
      expect(fileTestHelper.fileExists(expectedFilePath2)).toBe(true)

      const loadResult = await loadResults(exportPath, results.benchmarkName)
      loadResult.forEach((entry) => {
        expect(entry.runtimeVersion).toBeDefined();
        entry.runtimeVersion = 'Mock Node version'
      })
      expect(loadResult).toMatchSnapshot()

      fileTestHelper.deleteDir(exportPath)
    })
  })
})
