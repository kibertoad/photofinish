import { exportResults } from '../lib/resultsExporter'
import { BenchmarkResults } from '../lib/internal/benchmarkExecutioner'
import { FileTestHelper } from 'cli-testlab'
import { Measurement } from '../lib/Measurement'
import { nodeVersionMajor, runtimeVersion } from '../lib/internal/nodeVersionUtils'

const exportPath = `${__dirname}/results`

describe('resultsExporter', () => {
  describe('exportResults', () => {
    it('successfully writes benchmark results to a file', () => {
      const fileTestHelper = new FileTestHelper()
      const results: BenchmarkResults = {
        benchmarkName: 'Benchmark',
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

      const expectedFilePath = `${exportPath}/${results.benchmarkName}-${results.benchmarkEntryName}-Node_${nodeVersionMajor}-dummy.json`
      expect(fileTestHelper.fileExists(expectedFilePath)).toBe(true)
      const storedResultsAsText = fileTestHelper.getFileTextContent(expectedFilePath)
      const storedResults = JSON.parse(storedResultsAsText)
      expect(storedResults).toEqual({
        benchmarkEntryName: 'Benchmark_entry',
        benchmarkName: 'Benchmark',
        meanTimeMs: 0.00045,
        meanTimeNs: 450,
        runtimeVersion,
        warmupCycles: 10,
        label: 'dummy',
        benchmarkCycleSamples: 50,
        benchmarkCycles: 100,
      })
      fileTestHelper.deleteDir(exportPath)
    })
  })
})
