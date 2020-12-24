import { TableData } from './resultsExporter'
import { Measurement } from './Measurement'

const table = require('markdown-table')

export type TableOptions = {
  precision?: number
}

export function generateTable(
  results: readonly TableData[],
  options: TableOptions = {}
): string[][] {
  const tableRows: string[][] = [['Option', 'Msecs/op', 'Ops/sec']]
  if (results[0].benchmarkEntryVersion) {
    tableRows.splice(1, 0, ['Version'])
  }

  results.map((entry) => {
    const measurement = new Measurement(entry.meanTimeNs)
    const row = [
      entry.benchmarkEntryName,
      measurement.getTextInMsecs(options.precision ?? 3),
      measurement.getTextOpsPerSec(),
    ]
    if (entry.benchmarkEntryVersion) {
      row.splice(1, 0, entry.benchmarkEntryVersion)
    }

    tableRows.push(row)
  })

  return table(tableRows)
}
