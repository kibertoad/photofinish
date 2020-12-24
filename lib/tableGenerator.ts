const table = require('markdown-table')

import { Benchmark } from './BenchmarkBuilder'
import { BenchmarkResults } from './internal/benchmarkExecutioner'

export function generateTable(
  benchmark: Benchmark,
  results: readonly BenchmarkResults[]
): string[][] {
  const tableRows: string[][] = [['Option', 'Msecs/op', 'Ops/sec']]
  if (results[0].benchmarkEntryVersion) {
    tableRows.splice(1, 0, ['Version'])
  }

  results.map((entry) => {
    const row = [
      entry.benchmarkEntryName,
      entry.meanTime.getTextInMsecs(),
      entry.meanTime.getTextOpsPerSec(),
    ]
    if (entry.benchmarkEntryVersion) {
      row.splice(1, 0, entry.benchmarkEntryVersion)
    }

    tableRows.push(row)
  })

  return table(tableRows)
}
