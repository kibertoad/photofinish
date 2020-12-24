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
  const tableIndex: string[] = ['Node', 'Option', 'Msecs/op', 'Ops/sec']

  const tableRows: string[][] = [tableIndex]
  results.map((entry) => {
    const measurement = new Measurement(entry.meanTimeNs)
    const row = [
      entry.runtimeVersion,
      entry.benchmarkEntryVersion ? `${entry.benchmarkEntryName} ${entry.benchmarkEntryVersion}` : entry.benchmarkEntryName,
      measurement.getTextInMsecs(options.precision ?? 3),
      measurement.getTextOpsPerSec(),
    ]

    tableRows.push(row)
  })

  return table(tableRows)
}
