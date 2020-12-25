import sortOn from 'sort-on'
import { TableData } from './resultsExporter'
import { Measurement } from './Measurement'

const table = require('markdown-table')

export type SortParam = {
  field: keyof TableData
  order: 'asc' | 'desc'
}

export type TableOptions = {
  precision?: number
  sortBy?: SortParam | SortParam[]
}

function getSortedResults(results: readonly TableData[], sortParams?: SortParam[] | SortParam) {
  if (!sortParams) {
    return results
  }
  const sortArr = Array.isArray(sortParams) ? sortParams : [sortParams]
  const sort = sortArr.map((entry) => {
    return entry.order === 'asc' ? entry.field : `-${entry.field}`
  })

  return sortOn(results, sort)
}

export function generateTable(results: readonly TableData[], options: TableOptions = {}): string {
  const sortedResults = getSortedResults(results, options.sortBy)
  const tableIndex: string[] = ['Node', 'Option', 'Msecs/op', 'Ops/sec', 'V8']

  const tableRows: string[][] = [tableIndex]
  sortedResults.map((entry) => {
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
