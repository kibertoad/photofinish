import { BenchmarkResults } from './internal/benchmarkExecutioner'
import path from 'path'
import fs from 'fs'

const nodeVersion = process.versions.node
const runtimeVersion = `${nodeVersion}, V8 ${process.versions.v8}`

export type TableData = {
  runtimeVersion: string
  benchmarkName: string
  benchmarkEntryName: string
  benchmarkEntryVersion?: string
  meanTimeNs: number
  meanTimeMs: number
}

export type ExportOptions = {
  exportPath?: string
}

export function exportResults(
  benchmarkResults: BenchmarkResults,
  options: ExportOptions = {}
): void {
  const exportPath = options?.exportPath ?? '/results'
  const exportData: TableData = {
    runtimeVersion,
    benchmarkName: benchmarkResults.benchmarkName,
    benchmarkEntryName: benchmarkResults.benchmarkEntryName,
    benchmarkEntryVersion: benchmarkResults.benchmarkEntryVersion,
    meanTimeNs: benchmarkResults.meanTime.getTimeInNanoSeconds(),
    meanTimeMs: benchmarkResults.meanTime.getTimeInMilliSeconds(),
  }

  const filename = `${benchmarkResults.benchmarkName}-${
    benchmarkResults.benchmarkEntryName
  }-Node_${nodeVersion.slice(0, 2)}.json`
  const resolvedPathDir = path.resolve(
    exportPath,
    normalizePath(benchmarkResults.benchmarkName),
    normalizePath(benchmarkResults.benchmarkEntryName)
  )
  const resolvedPathFile = path.resolve(resolvedPathDir, filename)

  fs.mkdirSync(resolvedPathDir, { recursive: true })
  fs.writeFileSync(resolvedPathFile, JSON.stringify(exportData, null, 2))
}

function normalizePath(path: string) {
  return path.replace(/ /g, '_').toLowerCase()
}
