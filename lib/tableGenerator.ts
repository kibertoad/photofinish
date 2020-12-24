import { TableData } from './resultsExporter'
import { Measurement } from './Measurement'

const table = require('markdown-table')

export type TableOptions = {
  precision?: number
}

export function generateTable(results: readonly TableData[], options: TableOptions = {}): string {
  const tableIndex: string[] = ['Node', 'Option', 'Msecs/op', 'Ops/sec', 'V8']

  const tableRows: string[][] = [tableIndex]
  results.map((entry) => {
    const measurement = new Measurement(entry.meanTimeNs)
    const [nodeVersion, v8Version] = entry.runtimeVersion.split(', ')

    const row = [
      nodeVersion,
      entry.benchmarkEntryVersion
        ? `${entry.benchmarkEntryName} ${entry.benchmarkEntryVersion}`
        : entry.benchmarkEntryName,
      measurement.getTextInMsecs(options.precision ?? 3),
      measurement.getTextOpsPerSec(),
      v8Version,
    ]

    tableRows.push(row)
  })

  return table(tableRows)
}
