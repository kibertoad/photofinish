import { exportResults } from '../lib/resultsExporter'
import { BenchmarkResults } from '../lib/internal/benchmarkExecutioner'
import { FileTestHelper } from 'cli-testlab'
import { Measurement } from '../lib/Measurement'

const exportPath = `${__dirname}/results`

const nodeVersion = process.versions.node
const runtimeVersion = `${nodeVersion}, V8 ${process.versions.v8}`
const nodeText = `${nodeVersion.slice(0, 2)}`

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

      const expectedFilePath = `${exportPath}/${results.benchmarkName}-${results.benchmarkEntryName}-Node_${nodeText}-dummy.json`
      expect(fileTestHelper.fileExists(expectedFilePath)).toBe(true)
      const storedResultsAsText = fileTestHelper.getFileTextContent(expectedFilePath)
      const storedResults = JSON.parse(storedResultsAsText)
      expect(storedResults).toEqual({
        benchmarkEntryName: 'Benchmark_entry',
        benchmarkName: 'Benchmark',
        meanTimeMs: 0.00045,
        meanTimeNs: 450,
        runtimeVersion: runtimeVersion,
        warmupCycles: 10,
        label: 'dummy',
        benchmarkCycleSamples: 50,
        benchmarkCycles: 100,
      })
      fileTestHelper.deleteDir(exportPath)
    })
  })
})
