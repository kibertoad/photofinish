import { nodeVersionMajor } from './nodeVersionUtils'
import { BenchmarkResults } from './benchmarkExecutioner'

export function generateResultsFilename(benchmarkResults: BenchmarkResults) {
  const labelSuffix = benchmarkResults.label ? `-${benchmarkResults.label}` : ''

  return `${normalizePath(benchmarkResults.benchmarkName)}-${normalizePath(
    benchmarkResults.benchmarkEntryName
  )}-Node_${nodeVersionMajor}${labelSuffix}.json`
}

function normalizePath(path: string) {
  return path.replace(/ /g, '_')
}
