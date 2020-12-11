const table = require('markdown-table')

import { Benchmark } from '../BenchmarkBuilder'
import { BenchmarkResults } from './benchmarkExecutioner'

export function generateTable(
  benchmark: Benchmark,
  results: readonly BenchmarkResults[]
): string[][] {
  const tableRows: string[][] = [['Option', 'Msecs/op', 'Ops/sec']]
  results.map((entry) => {
    tableRows.push([
      entry.benchmarkEntryName,
      entry.meanTime.getTextInMsecs(),
      entry.meanTime.getTextOpsPerSec(),
    ])
  })

  return table(tableRows)
}
