import { BenchmarkResults } from './internal/benchmarkExecutioner'
import mkdirp from 'mkdirp'
import path from 'path'
import { promises as fs } from 'fs'

const nodeVersion = process.versions.node
const runtimeVersion = `${nodeVersion}, V8 ${process.versions.v8}`

export type TableData = {
  runtimeVersion: string
  benchmarkName: string
  benchmarkEntryName: string
  meanTimeNs: number
  meanTimeMs: number
}

export type ExportOptions = {
  exportPath?: string
}

export async function exportResults(
  benchmarkResults: BenchmarkResults,
  options: ExportOptions = {}
): Promise<void> {
  const exportPath = options?.exportPath ?? '/results'
  const exportData: TableData = {
    runtimeVersion,
    benchmarkName: benchmarkResults.benchmarkName,
    benchmarkEntryName: benchmarkResults.benchmarkEntryName,
    meanTimeNs: benchmarkResults.meanTime.getTimeInNanoSeconds(),
    meanTimeMs: benchmarkResults.meanTime.getTimeInMilliSeconds(),
  }

  const filename = `${nodeVersion.slice(0, 2)}.json`
  const resolvedPathDir = path.resolve(
    exportPath,
    normalizePath(benchmarkResults.benchmarkName),
    normalizePath(benchmarkResults.benchmarkEntryName)
  )
  const resolvedPathFile = path.resolve(resolvedPathDir, filename)

  await mkdirp(resolvedPathDir)
  await fs.writeFile(resolvedPathFile, JSON.stringify(exportData))
}

function normalizePath(path: string) {
  return path.replace(/ /g, '_').toLowerCase()
}
