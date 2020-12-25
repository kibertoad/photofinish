import { BenchmarkResults } from './internal/benchmarkExecutioner'
import path from 'path'
import fs from 'fs'
import { runtimeVersion } from './internal/nodeVersionUtils'
import { generateResultsFilename } from './internal/filenameUtils'

export type TableData = {
  runtimeVersion: string
  benchmarkName: string
  benchmarkEntryName: string
  benchmarkEntryVersion?: string
  meanTimeNs: number
  meanTimeMs?: number
  warmupCycles: number
  benchmarkCycles: number
  benchmarkCycleSamples: number
  label?: string
}

export type ExportOptions = {
  exportPath?: string
}

export function exportResults(
  benchmarkResults: BenchmarkResults,
  options: ExportOptions = {}
): void {
  const exportPath = options?.exportPath ?? './results'
  const exportData: TableData = {
    runtimeVersion,
    benchmarkName: benchmarkResults.benchmarkName,
    benchmarkEntryName: benchmarkResults.benchmarkEntryName,
    benchmarkEntryVersion: benchmarkResults.benchmarkEntryVersion,
    benchmarkCycles: benchmarkResults.benchmarkCycles,
    benchmarkCycleSamples: benchmarkResults.benchmarkCycleSamples,
    label: benchmarkResults.label,
    warmupCycles: benchmarkResults.warmupCycles,
    meanTimeNs: benchmarkResults.meanTime.getTimeInNanoSeconds(),
    meanTimeMs: benchmarkResults.meanTime.getTimeInMilliSeconds(),
  }

  const filename = generateResultsFilename(benchmarkResults)
  const resolvedPathFile = path.resolve(exportPath, filename)

  fs.mkdirSync(exportPath, { recursive: true })
  fs.writeFileSync(resolvedPathFile, JSON.stringify(exportData, null, 2))
}
