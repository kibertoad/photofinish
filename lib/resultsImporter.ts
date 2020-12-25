import { TableData } from './resultsExporter'

const { loadFiles } = require('load-goblin')

export async function loadResults(baseResultsDir: string): Promise<TableData[]> {
  const loadResults = await loadFiles({
    filter: '*.json',
    rootDirectory: baseResultsDir,
    recursively: true,
  })

  return loadResults.map((entry: Record<string, any>) => {
    return {
      runtimeVersion: entry.content.runtimeVersion,
      benchmarkName: entry.content.benchmarkName,
      benchmarkEntryName: entry.content.benchmarkEntryName,
      benchmarkEntryVersion: entry.content.benchmarkEntryVersion,
      meanTimeNs: entry.content.meanTimeNs,
      meanTimeMs: entry.content.meanTimeMs,
      warmupCycles: entry.content.warmupCycles,
      benchmarkCycles: entry.content.benchmarkCycles,
      benchmarkCycleSamples: entry.content.benchmarkCycleSamples,
      label: entry.content.label,
    }
  })
}
