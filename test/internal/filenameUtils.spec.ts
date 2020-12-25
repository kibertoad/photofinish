import { generateResultsFilename } from '../../lib/internal/filenameUtils'
import { BenchmarkResults } from '../../lib/internal/benchmarkExecutioner'
import { Measurement } from '../../lib/Measurement'
import { nodeVersionMajor } from '../../lib/internal/nodeVersionUtils'

describe('filenameUtils', () => {
  describe('generateResultsFilename', () => {
    it('generates correct filename with label', () => {
      const results: BenchmarkResults = {
        benchmarkName: 'Benchmark',
        benchmarkEntryName: 'Benchmark entry',
        meanTime: new Measurement(450),
        warmupCycles: 10,
        label: 'dummy',
        benchmarkCycleSamples: 50,
        benchmarkCycles: 100,
      }
      const filename = generateResultsFilename(results)
      expect(filename).toEqual(`Benchmark-Benchmark_entry-Node_${nodeVersionMajor}-dummy.json`)
    })

    it('generates correct filename without label', () => {
      const results: BenchmarkResults = {
        benchmarkName: 'Benchmark',
        benchmarkEntryName: 'Benchmark entry',
        meanTime: new Measurement(450),
        warmupCycles: 10,
        benchmarkCycleSamples: 50,
        benchmarkCycles: 100,
      }
      const filename = generateResultsFilename(results)
      expect(filename).toEqual(`Benchmark-Benchmark_entry-Node_${nodeVersionMajor}.json`)
    })
  })
})
