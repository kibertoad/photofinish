import { mean } from 'stats-lite'

const percentile2 = require('percentile')

export function filterSignificantSamples(samples: number[]): number[] {
  // return percentile(samples, 5)
  const percentileTopCutoff = percentile2(85, samples)
  const percentileLowCutoff = percentile2(15, samples)

  return samples.filter((entry) => {
    return entry >= percentileLowCutoff && entry <= percentileTopCutoff
  })
}

export function calculateMean(samples: number[]): number {
  return mean(samples)
}
