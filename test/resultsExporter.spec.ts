import { exportResults } from '../lib/resultsExporter'
import { BenchmarkResults } from '../lib/internal/benchmarkExecutioner'
import { FileTestHelper } from 'cli-testlab'
import { Measurement } from '../lib/Measurement'

const exportPath = `${__dirname}/results`

const nodeVersion = process.versions.node
const runtimeVersion = `${nodeVersion}, V8 ${process.versions.v8}`
const filename = `${nodeVersion.slice(0, 2)}.json`

describe('resultsExporter', () => {
  describe('exportResults', () => {
    it('successfully writes benchmark results to a file', async () => {
      const fileTestHelper = new FileTestHelper()
      const results: BenchmarkResults = {
        benchmarkName: 'Benchmark',
        benchmarkEntryName: 'Benchmark entry',
        meanTime: new Measurement(450),
      }
      await exportResults(results, {
        exportPath,
      })

      const expectedFilePath = `${exportPath}/benchmark/benchmark_entry/${filename}`
      expect(fileTestHelper.fileExists(expectedFilePath)).toBe(true)
      const storedResultsAsText = fileTestHelper.getFileTextContent(expectedFilePath)
      const storedResults = JSON.parse(storedResultsAsText)
      expect(storedResults).toEqual({
        benchmarkEntryName: 'Benchmark entry',
        benchmarkName: 'Benchmark',
        meanTimeMs: 0.00045,
        meanTimeNs: 450,
        runtimeVersion: runtimeVersion,
      })
      fileTestHelper.deleteDir(exportPath)
    })
  })
})
